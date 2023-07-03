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
    <div>
      <div>
        <h1>{props.title}</h1>
        <div>
          <img src={props.imgSrc} />
        </div>
        <p>{props.description}</p>
      </div>
      <div>
        <div onClick={onDeletehandler}>Delete</div>
        <div onClick={() => navigate(`${props.id}/edit`)}>Edit</div>
        <div>View</div>
      </div>
    </div>
  );
};

export default AdminArticleCard;
