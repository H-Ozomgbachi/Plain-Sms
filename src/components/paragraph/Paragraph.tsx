import "./Paragraph.css";

interface Props {
  content: string;
}
export default function Paragraph({ content }: Props) {
  return <p className="paragraph-style">{content}</p>;
}
