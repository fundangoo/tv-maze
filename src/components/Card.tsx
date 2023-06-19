type ICard = {
  imageUrl?: string;
  imageAlt?: string;
};

const Card: React.FC<ICard> = ({
  imageUrl = '/placeholder.png',
  imageAlt = 'missing image',
}): JSX.Element => {
  return (
    <figure>
      <img src={imageUrl} alt={imageAlt} className="w-full rounded-lg" />
    </figure>
  );
};

export default Card;
