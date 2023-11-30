import Typography from '@mui/material/Typography';

function NotificationCard(props) {
  const { item, className } = props;
  const variant = item?.variant || '';

  const handleClose = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if (props.onClose) {
      props.onClose(item.id);
    }
  };

  return (
    <div className="flex items-center">
      <img
        className="shrink-0 w-52 h-52 mr-12 rounded-lg overflow-hidden object-fill object-center"
        src={`assets/images/apps/tickers/logos/${item.channel_image}`}
        alt="Notification"
      />

      <div className="flex flex-col flex-auto">
        <div
          className="line-clamp-2 text-xl h-64 text-end pr-12 urdu-text"
          dangerouslySetInnerHTML={{ __html: item.text_ocr }}
        />

        <Typography className="mt-4 text-md leading-none" color="text.secondary">
          <span className="flex justify-end items-end mr-4">
            <span>
              <span className="mr-4">{item.date}</span>
              {item.time}
            </span>
          </span>
        </Typography>
      </div>
    </div>
  );
}

export default NotificationCard;
