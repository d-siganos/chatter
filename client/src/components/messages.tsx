import Message from './message';
import ScrollableFeed from 'react-scrollable-feed';
import { useChat } from '../contexts/chatContext';

const Messages = ({ name, encryptionKey }: { name: string | null | undefined, encryptionKey: string }) => {
  const { messages } = useChat();

  return (
    <ScrollableFeed className="py-16 px-6">
      {messages.map((message: string, i: number) => (
        <div key={i}>
          <Message lastMessages={[message, messages[i - 1]]} name={name} encryptionKey={encryptionKey} />
        </div>
      ))}
    </ScrollableFeed>
  );
}

export default Messages;
