import Description from "./Description";
import NewsLetter from "./NewsLetter";

const SideFooter = () => {
  return (
    <div className="mt-8 flex flex-col gap-20">
      <Description />
      <NewsLetter />
    </div>
  );
};

export default SideFooter;
