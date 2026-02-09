import styles from "./UserAvatar.module.css";

interface UserAvatarProps {
  firstName: string;
  lastName: string;
  onClick?: () => void;
}

export const UserAvatar = ({ firstName, lastName, onClick }: UserAvatarProps) => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <button className={styles.AvatarButton} onClick={onClick} type="button">
      <div className={styles.Circle}>{initials}</div>
      <span className={styles.Name}>{firstName} {lastName}</span>
    </button>
  );
};