import { useEffect } from 'preact/compat';

export function IndexPage(props: unknown) {
  useEffect(() => {
    location.href = '/markdown';
  }, []);
  return <div>TODO: IndexPage</div>;
}
