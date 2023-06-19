import { useParams } from 'react-router-dom';
import { useShow } from '../api/show-api-utils';
import { useErrorBoundary } from 'react-error-boundary';
import ShowDetails from '../components/show/ShowDetails';

const Details: React.FC = (): JSX.Element => {
  const { id: showId } = useParams();
  const { data: show, isError } = useShow(showId || '');

  const { showBoundary } = useErrorBoundary();
  if (isError) showBoundary(null);

  return <ShowDetails show={show} />;
};

export default Details;
