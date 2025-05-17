import UserService from "@/services/UserService";
import { Achievement, Workout } from "@/types";

interface UserProfileProps {
  user: { email: string; firstName: string; lastName: string, achievements: Achievement[],  workouts: Workout[] };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div>
      <h2>User Profile</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>First Name:</strong> {user.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastName}
      </p>
      <h3>Achievements</h3>
      <ul>
        {user.achievements &&
          user.achievements.map((achievement) => (
            <li key={achievement.id}>
              {achievement.exercise.title}: {achievement.amount}
            </li>
          ))}
      </ul>
      <h3>Workouts</h3>
      <ul>
        {user.workouts &&
          user.workouts.map((workout) => (
            <li key={workout.id}>
              {workout.title} - {workout.date.toString()}
            </li>
          ))}
      </ul>
      
    </div>
  );
};

export default UserProfile;
