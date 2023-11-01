import { useState } from 'react';
import BucketForm from './BucketForm';

function Bucket(props) {
  // State to manage item editing
  const [edit, setEdit] = useState({
    id: null,     // ID of the item being edited
    value: '',    // New value of the item
    eagerness: '', // Eagerness level of the item
  });

  console.log(props.bucket);

  // Function to submit item updates
  const submitUpdate = (value) => {
    // Call the editBucketItem function from props with the ID and new value
    props.editBucketItem(edit.id, value);
    // Reset the edit state
    setEdit({ id: null, value: '', eagerness: '' });
  };

  // Conditional rendering: if an item is being edited, display the edit form
  if (edit.id) {
    return <BucketForm edit={edit} onSubmit={submitUpdate} />;
  }

  // Map through the bucket array and render each item
  return props.bucket.map((item, i) => (
    <div
      className={
        item.isComplete
          ? `bucket-row complete ${item.eagerness}`
          : `bucket-row ${item.eagerness}`
      }
      key={i}
    >
      <div key={item.id} onClick={() => props.completeBucketItem(item.id)}>
        {item.text}
      </div>
      <div className="icons">
        {console.log(item)}
        {/* Clicking the ✏️ icon sets the edit state to edit the item */}
        <p onClick={() => setEdit({ id: item.id, value: item.text, eagerness: item.eagerness })}> ✏️</p>
        {/* Clicking the 🗑️ icon calls removeBucketItem to remove the item */}
        <p onClick={() => props.removeBucketItem(item.id)}> 🗑️</p>
      </div>
    </div>
  ));
}

export default Bucket;
