import { Sidebar } from "flowbite-react";
import { IconType } from "react-icons";
import { Link, useLocation } from "react-router-dom";

interface Props {
  icon: IconType;
  name: string;
  url: {
    name: string;
    url: string;
  }[];
}
const Item = ({ icon, name, url }: Props) => {
  const location = useLocation();
  return url.map((e) => {
    return (
      <div
        key={e.url}
        className={
          location.pathname.substring(1) === e.url
            ? "bg-gray-200 rounded-md"
            : ""
        }
      >
        <Link to={e.url} replace={true}>
          <Sidebar.Item icon={icon}>{name}</Sidebar.Item>
        </Link>
      </div>
    );
  });
};

export default Item;
