import Message from './message';
import ScrollToBottomDiv from './scrollToBottom';
import { useChat } from '../contexts/chatContext';

const Messages = ({ user, messageId, encryptionKey }: { user: any, messageId: string, encryptionKey: string }) => {
  const { messages } = useChat();

  return (
    <div className="py-20 px-6 scroll-smooth">
      {messages.map((message: string, i: number) => (
        <div key={i}>
          <Message lastMessages={[message, messages[i - 1]]} messageId={messageId} user={user} encryptionKey={encryptionKey} />
        </div>
      ))}
      { !messageId ? <ScrollToBottomDiv /> : null }
    </div>
  );
}

export default Messages;
