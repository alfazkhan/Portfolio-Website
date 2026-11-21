import Subs2LearnWelcome from "@/components/Subdomains/Subs2LearnWelcome";
import {
  getSubs2LearnProject,
  getSubs2LearnWelcomeMetadata,
} from "@/components/Subdomains/subs2learn/data-2s2l";

export const metadata = getSubs2LearnWelcomeMetadata();

export default function Subs2LearnWelcomePage() {
  return <Subs2LearnWelcome project={getSubs2LearnProject()} />;
}
