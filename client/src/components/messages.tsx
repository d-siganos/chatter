import Message from './message';
import ScrollableFeed from 'react-scrollable-feed';

const Messages = ({ messages, name }: { messages: Array<string>, name: string | null | undefined }) => {
  return (
    <ScrollableFeed className="py-16 px-6">
      {messages.map((message: string, i: number) => (
        <div key={i}>
          <Message data={message} name={name} />
        </div>
      ))}
    </ScrollableFeed>
  );
}

export default Messages;
