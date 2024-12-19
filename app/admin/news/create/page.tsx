// app/admin/news/create/page.tsx
import ContentCreateForm from '@/components/ContentCreateForm';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Create News',
  description: 'Create a new news article',
};

export default function CreateNewsPage() {
  return (
    <div>
      <ContentCreateForm />
    </div>
  );
}