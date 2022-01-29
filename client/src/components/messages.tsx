import Message from './message';
import ScrollableFeed from 'react-scrollable-feed';
import { useChat } from '../contexts/chatContext';
import { userInfo } from 'os';

const Messages = ({ user, encryptionKey }: { user: any, encryptionKey: string }) => {
  const { messages } = useChat();

  return (
    <ScrollableFeed className="py-16 px-6 scroll-smooth">
      {messages.map((message: string, i: number) => (
        <div key={i}>
          <Message lastMessages={[message, messages[i - 1]]} user={user} encryptionKey={encryptionKey} />
        </div>
      ))}
    </ScrollableFeed>
  );
}

export default Messages;
