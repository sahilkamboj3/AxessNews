interface SideNavType {
  categories: string[];
}

const SideNav: React.FC<SideNavType> = ({ categories }) => {
  return (
    <div>
      <h1>Side Nav Bar</h1>
      {categories.map((category) => {
        return <h5>{category}</h5>;
      })}
    </div>
  );
};

export default SideNav;
