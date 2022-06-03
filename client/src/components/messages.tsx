import Message from './message';
import ScrollToBottomDiv from './scrollToBottom';
import { useChat } from '../contexts/chatContext';

const Messages = ({ user, messageId, encryptionKey, deleteMessage }: { user: any, messageId: string, encryptionKey: string, deleteMessage: any }) => {
  const { messages } = useChat();

  return (
    <div className="py-20 px-6 scroll-smooth">
      {messages.map((message: string, i: number) => (
        <div key={i}>
          <Message lastMessages={[message, messages[i - 1]]} messageId={messageId} user={user} encryptionKey={encryptionKey} deleteMessage={deleteMessage} />
        </div>
      ))}
      { !messageId ? <ScrollToBottomDiv /> : null }
    </div>
  );
}

export default Messages;
