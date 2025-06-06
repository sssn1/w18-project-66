import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getUserById } from '@/lib/actions/user.actions_xx';
import UpdateUserForm_xx from './update-user-form_xx';

export const metadata: Metadata = {
  title: 'Update User',
};

const AdminUserUpdatePage_xx = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;
  const user = await getUserById(id);
  if (!user) notFound();

  // console.log('user', user);

  return (
    <div className='space-y-8 max-w-lg mx-auto'>
      <h1 className='h2-bold'>Update User</h1>
      <UpdateUserForm_xx user={user} />
    </div>
  );
};
export default AdminUserUpdatePage_xx;
