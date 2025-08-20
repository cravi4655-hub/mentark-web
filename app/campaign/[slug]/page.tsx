// app/campaign/[slug]/page.tsx
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `Campaign: ${slug}`,
    description: `View campaign details for ${slug}`,
  };
}

export default async function CampaignPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Campaign: {slug}
          </h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">
              This is a sample campaign page. In a real implementation, you would:
            </p>
            <ul className="mt-2 space-y-1 text-blue-700 text-sm">
              <li>• Fetch campaign data from database using the slug</li>
              <li>• Display campaign details, story, and goal amount</li>
              <li>• Show donation progress and contributors</li>
              <li>• Add donation functionality</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Campaign Details</h2>
              <p className="text-gray-600 mt-2">
                Campaign slug: <code className="bg-gray-100 px-2 py-1 rounded">{slug}</code>
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Next Steps</h3>
              <p className="text-gray-600">
                To implement this page fully, connect it to your Campaign model in the database
                and add the fundraising functionality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}