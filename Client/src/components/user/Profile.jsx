import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

const Profile = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      <div className="container profile-container my-5">
        <div className="profile-card text-center">
          <div className="profile-avatar">
            <span className="material-symbols-outlined">account_circle</span>
          </div>

          <h3 className="profile-name">{user?.name}</h3>
          <p className="profile-email">{user?.email}</p>

          <div className="profile-details mt-4">
            <div className="profile-row">
              <span>Account Status</span>
              <span className="status-badge">Active</span>
            </div>

            <div className="profile-row">
              <span>Orders Placed</span>
              <span>{user?.orders?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
