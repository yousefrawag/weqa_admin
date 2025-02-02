import { Link } from 'react-router-dom';

const Breadcrumb = ({ pageName }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-bold text-main" to="/">
              لوحه التحكم /
            </Link>
          </li>
          <li className="font-medium">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
