import React from 'react'

const Count = ({totalUser, totalTask , totalBlockedUser, totalNewUser}) => {
  return (
    <main className="p-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    
    {/* Total Users Card */}
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-blue-600">Total Users</h2>
      <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-2">{totalUser}</p>
      <p className="text-gray-500 dark:text-gray-400">Registered users</p>
    </div>

    {/* You can duplicate this for Total Tasks, Blocked Users, etc. */}
    
    {/* Total Tasks Card */}
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-green-600">Total Tasks</h2>
      <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-2">{totalTask}</p>
      <p className="text-gray-500 dark:text-gray-400">All tasks</p>
    </div>

    {/* Blocked Users Card */}
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-red-600">Blocked Users</h2>
      <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-2">{totalBlockedUser}</p>
      <p className="text-gray-500 dark:text-gray-400">Users restricted by admin</p>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-yellow-600">New Users</h2>
      <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-2">{totalNewUser}</p>
      <p className="text-gray-500 dark:text-gray-400"> New Registered users</p>
    </div>

  </div>
</main>
  )
}

export default Count
