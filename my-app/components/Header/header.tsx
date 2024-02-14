import Link from "next/link";
import Image from "next/image";

const Header = () => {

  return (
    <nav className="header">
      <div className="logo">
        <Link legacyBehavior href="/">
          <Image
            src="/casumo-logo.svg"
            alt="casumo logo"
            width={100}
            height={24}
            priority
          />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
