import type { Metadata } from 'next'
import Image from 'next/image'
import MemberBio from '@/components/MemberBio/MemberBio'
import { members } from '@/lib/members'
import styles from './about.module.css'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Pumpkin Bread, a five-piece folk ensemble based in Boston, MA. Meet the members: Steven Manwaring, Jackson Clawson, Maura Shawn Scanlin, Aidan Scrimgeour, and Conor Hearn.',
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.bio}>
        <div className={styles.bioText}>
          <blockquote className={styles.quote}>
            "Pure progressive folk fusion" – The Boston Globe
          </blockquote>
          <p>
            In September of 2016, five longtime friends, drawn to one another by their musicality
            and distinguishable voices on their instruments, performed as "Pumpkin Bread" for the
            first time. Since then, the five-piece folk ensemble based in Boston, MA has been
            dazzling audiences with its original acoustic music that blends influences from
            traditional folk songs and fiddle tunes with modern sensibilities and intricate
            arrangements.
          </p>
          <p>
            Pumpkin Bread developed its uncommon sound in kitchen jams, traditional music sessions,
            and soup nights in the Boston area folk music scene. The band released its self-titled
            debut album in May 2017 in collaboration with Nine Athens Music.
          </p>
          <p>
            Pumpkin Bread has performed as part of Brian O'Donovan's Burren Backroom Series and was
            a headlining act at the 2018 Boston Celtic Music Festival. In the spring of 2018, the
            ensemble toured in Boston, New York, Baltimore, Washington D.C., Charlottesville,
            Middlebury, and Portland, performing at decorated folk venues like Club Passim in
            Cambridge, MA, The Front Porch in Charlottesville, VA, and One Longfellow Square in
            Portland, ME.
          </p>
          <p>
            In March 2019, Pumpkin Bread released its second full-length album titled "Dear
            Starling" with producer Courtney Hartman.
          </p>
        </div>
        <div className={styles.bioPhoto}>
          <Image
            src="/images/about/group.avif"
            alt="Pumpkin Bread band members"
            width={970}
            height={648}
            className={styles.groupPhoto}
            priority
          />
        </div>
      </section>

      <section className={styles.members} aria-label="Band members">
        {members.map((member) => (
          <MemberBio key={member.name} member={member} />
        ))}
      </section>

      <div className={styles.sponsor}>
        <p>Generously supported by</p>
        <Image
          src="/images/about/nine-athens.avif"
          alt="Nine Athens Music"
          width={218}
          height={112}
          className={styles.sponsorLogo}
        />
      </div>
    </div>
  )
}
