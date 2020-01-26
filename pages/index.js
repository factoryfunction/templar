import Link from "next/link";

const Index = () => (
  <div>
    <Link href="/home">
      <a>Home</a>
    </Link>
    <Link href="/editor">
      <a>Editor</a>
    </Link>
  </div>
);

export default Index;
