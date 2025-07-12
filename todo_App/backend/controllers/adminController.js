const User = require('../models/User');
const Task = require('../models/Task');

const getAllUsersWithTasks = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const keyword = req.query.search || '';

    const userQuery = {
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { email: { $regex: keyword, $options: 'i' } },
      ],
    };

    const totalUsers = await User.countDocuments(userQuery);
    const users = await User.find(userQuery)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('-password');

    const usersWithTasks = await Promise.all(
      users.map(async (user) => {
        const tasks = await Task.find({ user: user._id });
        return { ...user._doc, tasks };
      })
    );

    res.json({
      users: usersWithTasks,
      page,
      pages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

const blockUnblockUser = async (req, res) => {
  const { userId } = req.params;
  const { block } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.isBlocked = block;
  await user.save();

  res.json({ message: `User ${block ? 'blocked' : 'unblocked'} successfully` });
};


const resetOwnPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: 'Both old and new passwords are required (min 6 characters)' });
  }

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await user.matchPassword(oldPassword);
  if (!isMatch) return res.status(401).json({ message: 'Old password is incorrect' });

  user.password = newPassword; // Hashing will be done by pre-save middleware
  await user.save();

  res.json({ message: 'Password updated successfully' });
};


const getAdminStats = async (req, res) => {

    const totalUsers = await User.countDocuments();
    const totalBlockedUsers = await User.countDocuments({ isBlocked: true });

    // 24-hour window
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const newUsersToday  = await User.countDocuments({
      createdAt: { $gte: last24Hours }
    });

    const totalTasks = await Task.countDocuments();

    res.json({
      totalUsers,
      totalBlockedUsers,
      newUsersToday,
      totalTasks,
    });
  
};

module.exports = { getAllUsersWithTasks, blockUnblockUser, resetOwnPassword, getAdminStats };
