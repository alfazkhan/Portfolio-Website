import Subs2LearnLanding from "@/components/Subdomains/Subs2LearnLanding";
import { getSubs2LearnProject } from "@/components/Subdomains/subs2learn/data-2s2l";

export default function Subs2LearnPage() {
  const project = getSubs2LearnProject();

  return <Subs2LearnLanding project={project} />;
}
