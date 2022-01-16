import Message from './message';
import ScrollableFeed from 'react-scrollable-feed';
import { useChat } from '../contexts/chatContext';

const Messages = ({ name }: { name: string | null | undefined }) => {
  const { messages } = useChat();

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
