import { parse } from 'node-html-parser';

async function getData(blogId: string) {
  const response = await fetch(`https://api.synodic.ai/campaigns/${blogId}`, { cache: 'force-cache' });
  const data = await response.json();
  const root = parse(data.html);
  root.querySelectorAll('td.mceLayoutContainer').forEach((tag: any) => {
    if (
      tag.innerText.includes('View email in browser') ||
      tag.innerText.includes('update your preferences') ||
      tag.innerText.includes('unsubscribe')
    ) {
      tag.remove();
    }
  });

  const bodyTable = root.querySelector('#bodyTable');
  if (bodyTable) {
    bodyTable.setAttribute('style', `background-color: white;`);
  }

  return root.toString();
}

export default async function BlogPost({ params }: { params: { blogId: string } }) {
  const htmlContent = await getData(params.blogId);

  return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
