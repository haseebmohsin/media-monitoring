import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import formatDate from 'src/app/helpers/formatDate';

function CollageContent() {
  const selectedTickers = useSelector((state) => state.tickersApp?.tickers?.selectedTickers);
  const [selectedImages, setSelectedImages] = useState(selectedTickers);

  // useEffect(() => {
  //   const generateDateTimeImages = async () => {
  //     for (const item of selectedImages) {
  //       const node = document.getElementById(`dateTime-${item.id}`);

  //       toPng(node)
  //       .then(function (dataUrl) {
  //         var img = new Image();
  //         img.src = dataUrl;
  //         img.alt = 'date';
  //         document.getElementById(`dateTimeImage-${item.id}`).appendChild(img);
  //       })
  //     }
  //   }

  //   generateDateTimeImages();
  // },[])

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(selectedImages);
    const [reorderedItem] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedItem);

    setSelectedImages(reorderedImages);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="collage">
        {(providedDroppable) => (
          <div ref={providedDroppable.innerRef} className="p-24">
            <div className="relative" id="collage">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img
                  className="w-[90%] h-[100%] opacity-30"
                  src="assets/images/logo/demp_logo.png"
                  alt="DEMP Logo"
                />
              </div>
              {selectedImages?.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(providedDraggable) => (
                    <div
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      className="flex"
                    >
                      <div
                        {...providedDraggable.dragHandleProps}
                        className="cursor-move flex flex-col items-center bg-gray-200"
                      >
                        <img
                          className="w-[110px] h-[70px]"
                          src={`assets/images/apps/tickers/logos/${item.channel_image}`}
                          alt={item.channel_image}
                        />

                        <div
                          className="flex flex-col w-[110px] p-4 bg-gray-400"
                          id={`dateTime-${item.id}`}
                        >
                          <div className="w-full text-white text-lg font-bold">
                            {formatDate(item.date)}
                          </div>
                          <div className="w-full text-white text-lg font-bold">{item.time}</div>
                        </div>
                      </div>

                      <img
                        className="w-full max-h-[130px]"
                        src={`${process.env.REACT_APP_TICKERS_BASE_URL}/static/${item.ticker_image}`}
                        alt="ticker"
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {providedDroppable.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default CollageContent;
