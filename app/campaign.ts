'use server';

import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

export async function createCampaign(formData: FormData) {
  const title = String(formData.get('title') ?? '');
  const story = String(formData.get('story') ?? '');
  const goalAmount = Number(formData.get('goalAmount') ?? 0);

  if (title.length < 3) throw new Error('Title too short');
  if (story.length < 20) throw new Error('Story too short');
  if (!Number.isFinite(goalAmount) || goalAmount <= 0) throw new Error('Invalid goal');

  // unique slug
  const base = slugify(title) || `campaign-${Date.now()}`;
  let slug = base;
  let i = 1;
  while (await db.campaign.findUnique({ where: { slug } })) {
    slug = `${base}-${i++}`;
  }

  await db.campaign.create({
    data: { title, story, goalAmount, slug, isApproved: true, currency: 'INR' },
  });

  redirect(`/campaign/${slug}`);
}
