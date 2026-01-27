import toast from 'react-hot-toast';
import styles from "./ConfirmDelete.module.css"
import Button from '../../../../components/Button/Button';
const confirmDelete = (message="Are you sure you want to delete that") => {
  return new Promise((resolve) => {
  toast((t) => (
    <span>
      {message}
      <div className={styles.toastContainer}>
        <Button
        bgColor='var(--color-danger)'
          action={async () => {
            toast.dismiss(t.id);
            resolve(true);
          }}
        >
          Delete
        </Button>
        <Button
        bgColor='var(--button-cancel)'
          action={() =>{
            toast.dismiss(t.id)
            resolve(false);
          }}
        >
          Cancel
        </Button>
      </div>
    </span>
  ), {
    duration: 6000,
    position: 'top-center',
  });
});
};

export default confirmDelete;