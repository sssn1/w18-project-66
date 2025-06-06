import { requireAdmin } from '@/lib/auth.guard';

const OverviewPage_xx = async () => {
  await requireAdmin();

  return <div>OverviewPage_xx</div>;
};
export default OverviewPage_xx;
