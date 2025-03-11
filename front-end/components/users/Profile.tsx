import { User, Post, Achievement } from "@/types";
import profileStyles from "../../styles/Profile.module.css";
import { useTranslation } from "next-i18next";

type ProfileProps = {
  user: User;
  numPosts: number;
  latestPost: Post | null;
  latestAchievement: Achievement | null;
};

const ProfileComponent: React.FC<ProfileProps> = ({
  user,
  numPosts,
  latestPost,
  latestAchievement,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={profileStyles.mainProfile}>
        <div className={profileStyles.profilePage}>
          <div className={profileStyles.top}>
            <h3 className={profileStyles.title}>{t("profile.title")}</h3>
            <div className={profileStyles.UsernameAndPfp}>
              <p className={profileStyles.username}>{user.name}</p>
              <img
                src="/pictures/pfp.png"
                alt="Profile Picture"
                width={100}
                height={100}
                className={profileStyles.pfp}
              ></img>
            </div>
          </div>
          <div className={profileStyles.bottom}>
            <div className={profileStyles.PostsAndAchievementAndDate}>
              <p className={profileStyles.numPosts}>
                {t("profile.AantalPosts")}: {numPosts}
              </p>
              <p className={profileStyles.prestatie}>
                {t("profile.LaatstePrestatie")}:{" "}
                {user.achievements && user.achievements.length > 0
                  ? user.achievements[user.achievements.length - 1].title
                  : "No achievements yet"}
              </p>
            </div>
            <div className={profileStyles.boulderSection}>
              <p className={profileStyles.lastBoulder}>
                {t("profile.LastBoulder")}:
              </p>
              {latestPost && latestPost.boulder ? (
                <>
                  <p>
                    {latestPost.boulder.gym.gymName} -{" "}
                    {latestPost.boulder.grade}
                  </p>
                  <img
                    src={latestPost.image.path}
                    alt="Laatste Boulder"
                    className={profileStyles.boulder}
                  />
                </>
              ) : (
                <p>{t("profile.NoBouldersAvailable")}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
