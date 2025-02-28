import PasswordResetConfirmForm from './PasswordResetConfirmForm';

export default function PasswordResetConfirm({ params }) {
  return <PasswordResetConfirmForm token={params.id} />;
}
