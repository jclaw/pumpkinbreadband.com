import Image from 'next/image'
import type { Member } from '@/lib/members'
import styles from './MemberBio.module.css'

interface MemberBioProps {
  member: Member
}

export default function MemberBio({ member }: MemberBioProps) {
  return (
    <article className={styles.member}>
      <div className={styles.photoWrap}>
        <Image
          src={member.image}
          alt={member.name}
          width={120}
          height={120}
          className={styles.photo}
        />
      </div>
      <div className={styles.bio}>
        <h3 className={styles.name}>
          {member.website ? (
            <a href={member.website} target="_blank" rel="noopener noreferrer">
              {member.name}
            </a>
          ) : (
            member.name
          )}
        </h3>
        <p className={styles.text}>{member.bio}</p>
      </div>
    </article>
  )
}
