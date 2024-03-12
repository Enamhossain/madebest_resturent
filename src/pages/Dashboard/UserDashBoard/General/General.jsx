import React from 'react';

function General() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold mb-4">Welcome to your Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* General Information Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">General Information</h3>
          <div className="space-y-4">
            {/* User Profile Card */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">User Profile</h4>
              <p className="text-gray-700">View and update your profile information.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded">
                View Profile
              </button>
            </div>
            {/* Notifications Card */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Notifications</h4>
              <p className="text-gray-700">Manage your notification preferences.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded">
                Manage Notifications
              </button>
            </div>
          </div>
        </div>
        
        {/* Settings Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Settings</h3>
          <div className="space-y-4">
            {/* Account Settings Card */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Account Settings</h4>
              <p className="text-gray-700">Update your account settings and preferences.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded">
                Manage Account
              </button>
            </div>
            {/* Security Card */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-lg font-semibold">Security</h4>
              <p className="text-gray-700">Manage your account security settings.</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-2 rounded">
                Manage Security
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default General;
