import React, { useState } from 'react';
import AddSubscription from '../components/AddSubscription';
import './ManageSubscriptions.css';

const ManageSubscriptions = ({ subscriptions, onAddSubscription, onEditSubscription, onDeleteSubscription }) => {
  const [showAddSubscription, setShowAddSubscription] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState(null); // For editing subscription

  const handleAddClick = () => {
    setShowAddSubscription(true);
    setCurrentSubscription(null); // Reset for new addition
  };

  const handleCloseForm = () => {
    setShowAddSubscription(false);
    setCurrentSubscription(null);
  };

  const handleEditClick = (subscription) => {
    setCurrentSubscription(subscription);
    setShowAddSubscription(true);
  };

  return (
    <div className="manage-subscriptions-container">
      <h1>Manage Subscriptions</h1>
      <button className="add-subscription-button" onClick={handleAddClick}>
        {showAddSubscription ? 'Close Add Subscription' : 'Add New Subscription'}
      </button>
      
      {showAddSubscription && (
        <AddSubscription
          subscription={currentSubscription}
          onAddSubscription={onAddSubscription}
          onEditSubscription={onEditSubscription}
          onClose={handleCloseForm}
        />
      )}
      
      <div className="subscriptions-list">
        <table className="subscriptions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subscriber Name</th>
              <th>Plan Type</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.length > 0 ? (
              subscriptions.map((subscription) => (
                <tr key={subscription.id}>
                  <td>{subscription.id}</td>
                  <td>{subscription.subscriberName}</td>
                  <td>{subscription.planType}</td>
                  <td>{new Date(subscription.startDate).toLocaleDateString()}</td>
                  <td>{subscription.status}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(subscription)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => onDeleteSubscription(subscription.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No subscriptions available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSubscriptions;
