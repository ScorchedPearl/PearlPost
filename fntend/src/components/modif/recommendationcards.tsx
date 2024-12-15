import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function RecommendedCards({user}) {
  const testimonials = user?.recommendedUsers.map(user => ({
    name: user.name,
    designation: user.username,
    src: user.profileImageURL, 
  }));
  return <AnimatedTestimonials testimonials={testimonials} />;
}
