import React from "react";
import { useNavigate } from "react-router-dom";
interface Items {
  id: string;
  imgSrc: string;
  title: string;
  published: string;
  category: string;
  description: string;
  onDelete: (id: string) => void;
}

const AdminArticleCard: React.FC<Items> = (props) => {
  const navigate = useNavigate();

  const onDeletehandler = async () => {
    const id = props.id;
    props.onDelete(id);
  };
  return (
    <div className="w-96 h-[60vh]">
      <div className="flex flex-col">
        <h1 className="text-2xl text-white text-center h-auto w-auto mb-2">
          {props.title}
        </h1>
        <div className="h-[40vh]">
          <img src={props.imgSrc} className="h-full w-full" />
        </div>
        <p className="text-xl w-auto">{props.description}</p>
      </div>
      <div className="flex gap-2 ">
        <div onClick={onDeletehandler} className="p-2 bg-white text-black">
          Delete
        </div>
        <div
          onClick={() => navigate(`edit/${props.id}`)}
          className="p-2 bg-white text-black"
        >
          Edit
        </div>
        <div className="p-2 bg-white text-black">View</div>
      </div>
    </div>
  );
};

export default AdminArticleCard;
