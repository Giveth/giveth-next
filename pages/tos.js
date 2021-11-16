import { Box } from 'theme-ui'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'

const Seo = dynamic(() => import('../src/components/seo'))
const Layout = dynamic(() => import('../src/components/layout'))
const tosStyle = {
  a: {
    textDecoration: 'underline'
  },
  tableItem: {
    padding: '10px'
  }
}
const Tos = () => {
  return (
    <Layout>
      <Seo title='Terms of Use' />
      <Main sx={{ fontFamily: 'heading' }}>
        <Container>
          <section id='termsOfUse'>
            <h1>
              <strong>Terms of Use</strong>
            </h1>

            <h5>Effective date: November 7, 2021</h5>

            <p>
              Welcome to Giveth. Please read on to learn the rules that govern your use of our
              site(s) (“Site” or “Sites”).
            </p>
            <h2>ACCEPTANCE OF TERMS</h2>

            <p>
              The Giveth Foundation (“Giveth,” “we”,“us”or “our”) provides the information and tools
              on this website as described in these Terms of Use (&quot;Terms&quot;). These Terms
              are a binding contract between you, whether personally or on behalf of an entity
              (“you”) and Giveth. Your access to and use of the Site in any way means that you agree
              to all of these Terms, and these Terms will remain in effect while you use the Site.
            </p>
            <p>
              <strong>Please read these Terms carefully. </strong>They cover important information
              about our Tools available to you and any charges, taxes, and fees you may incur. These
              Terms include information about future changes to these Terms, limitations of
              liability, a class action waiver and resolution of disputes by arbitration instead of
              in court.
            </p>
            <p>
              TAKE NOTE THAT YOUR USE OF AND ACCESS TO OUR SITE(S) IS SUBJECT TO THE FOLLOWING
              TERMS; IF YOU DO NOT AGREE TO ALL OF THE FOLLOWING, YOU MAY NOT USE OR ACCESS THE
              TOOLS IN ANY MANNER AND YOU MUST DISCONTINUE USE IMMEDIATELY. IF YOUR ACTIONS ARE
              FOUND TO BE CONTRARY TO THESE TERMS YOUR PROJECTS MAY BE UNLISTED OR CANCELLED.
            </p>
            <h3>CHANGES</h3>

            <p>
              Giveth may update the Terms at any time as guided by our community governance
              processes, and will, without prior notice to all users, post a new version at{' '}
              <a
                style={tosStyle.a}
                href='https://giveth.io'
                target='_blank'
                rel='noopener noreferrer'
              >
                https://giveth.io
              </a>
              . The information on this site and your use of it is subject to the most recent
              version of the Terms posted.
            </p>
            <p>
              You waive any right to receive specific notice of each such change. It is your
              responsibility to periodically review these Terms of Use to stay informed of updates.
              You will be subject to, and will be deemed to have been made aware of and to have
              accepted, the changes in any revised Terms of Use by your continued use of the Site(s)
              after the date such revised Terms of Use are posted.​
            </p>
            <h4>
              <strong>CONTACT US</strong>
            </h4>

            <p>
              If you have any questions, comments, or concerns regarding these Terms or the Site,
              please contact us at:
            </p>
            <ul>
              <li>
                Email:{' '}
                <a
                  style={tosStyle.a}
                  href='mailto:info@giveth.io'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  info@giveth.io
                </a>
              </li>

              <li>
                Social Media:{' '}
                <a
                  style={tosStyle.a}
                  href='https://giveth.io/join'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  giveth.io/join
                </a>
              </li>

              <li>
                Address: Giveth Foundation, 475 E. Main Street, #154, Cartersville, GA 30121, United
                States
              </li>
            </ul>
            <h3>
              <strong>PRIVACY POLICY</strong>
            </h3>

            <p>
              Giveth takes the privacy of its users very seriously. For the current Privacy Policy,
              please click{' '}
              <a style={tosStyle.a} href='#privacyPolicy'>
                here
              </a>
              .
            </p>
            <h4>
              <strong>Personal Data of Children</strong>
            </h4>

            <p>
              The Site(s) is intended for users who are at least 18 years old. Persons under the age
              of 18 are not permitted to use or register for the Site(s) or use the Tools. We do not
              knowingly collect or solicit personally identifiable information from children under
              18 years of age; if you are a child under 18 years of age, please do not attempt to
              register for or otherwise use the Tools or send us any personal information. If we
              learn we have collected personal information from a child under 18 years of age, we
              will delete that information as quickly as possible. If you believe that a child under
              18 years of age may have provided us personal information, please contact us at
              info@giveth.io.
            </p>
            <h1>DESCRIPTION OF TOOLS</h1>

            <h2>WHAT WE DO</h2>

            <p>
              Giveth provides you with access to web applications, discussion channels, forums,
              third party products and a variety of other tools (&quot;Tools&quot;) through our Site
              for the transparent transfer of funds to charitable projects. Unless explicitly stated
              otherwise, any new features that augment or enhance the current Tools shall be subject
              to the Terms.
            </p>
            <p>
              Giveth does not sell goods nor services. Giveth is an open directory of projects
              accepting donations. All money and property transferred to projects listed on
              Giveth.io shall be an irrevocable gift to the recipient. Giveth takes no cut of money
              and benefits in no pecuniary way from the content provided by you or the projects that
              are funded by you.
            </p>
            <h3>NONPROFIT STATUS</h3>

            <p>
              On 09.07.2020, the Giveth Foundation was established as a component of the SDG Impact
              Fund, which is an IRS recognized 501(c)(3) tax-exempt public charity and not for
              profit corporation having its principal office in the city of Cartersville and State
              of Georgia as described in the Internal Revenue Code Sections 501(c)(3), 509(a)(1),
              and 170(b)(1)(A)(vi The SDG Impact Fund (Tax ID# 46-2368538) is an IRS recognized
              501(c)(3) tax-exempt public charity as described in the Internal Revenue Code Sections
              501(c)(3), 509(a)(1), and 170(b)(1)(A)(vi). All money and property transferred to The
              SDG Impact Fund shall be an irrevocable gift to the charity.
            </p>
            <h3>​COST AND FEES</h3>
            <p>
              Use of the Giveth Site and Tools is free. When donating cryptocurrency there are
              transaction fees associated with using the selected Blockchain, these are considered
              Third-Party costs and Giveth does not receive any portion of transaction fees. When
              donating fiat currencies a Third-Party payment processor will provide these Services,
              please refer to the Third-Party Services section below for details. In some cases we
              may pay your network gas fees for disbursing funds from our Tools to a charitable
              entity.
            </p>
            <p>
              <strong>
                Giveth does not sell goods or services. You hereby acknowledge that (i) Giveth does
                not supervise, direct, control or monitor the Donations and (ii) Giveth expressly
                disclaims any responsibility and liability for any Entity or any Donation made
                through the Tools, including but not limited to any warranty or condition of quality
                or fitness for a particular purpose, or compliance with any law, regulation, or
                code.
              </strong>
            </p>
            <h3>ELECTRONIC COMMUNICATIONS</h3>

            <p>
              As part of using the Site(s), you may receive communications through the Tools,
              including messages that Giveth sends you (for example, via email). When signing up for
              the Tools, you will provide the email address that will receive these messages and
              instructions on how to stop receiving messages.
            </p>
            <p>
              Visiting the Site, sending us emails, and completing online forms constitute
              electronic communications. You consent to receive electronic communications, and you
              agree that all agreements, notices, disclosures, and other communications we provide
              to you electronically, via email and on the Site, satisfy any legal requirement that
              such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC
              SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF
              NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE
              SITE. You hereby waive any rights or requirements under any statutes, regulations,
              rules, ordinances, or other laws in any jurisdiction which require an original
              signature or delivery or retention of non-electronic records, or to payments or the
              granting of credits by any means other than electronic means.
            </p>
            <h3>CHANGES TO GIVETH TOOLS</h3>

            <p>
              We’re always trying to improve our Tools, so they will change over time. We may
              suspend or discontinue all or any part of the Tools, or we may introduce new features
              or impose limits on certain features or restrict access to parts or all of the Tools.
              We’ll try to give you notice when we make a material change to the Tools that would
              adversely affect you, but this isn’t always practical. We reserve the right to remove
              any Content from the Site(s) at any time, for any reason (including, but not limited
              to, if someone alleges you contributed that Content in violation of these Terms), in
              our sole discretion, and without notice. We will not be liable to you or any third
              party for any modification, suspension, or discontinuance of the Site(s) or the Tools.
            </p>
            <p>
              We cannot guarantee the Site(s) and the Tools will be available at all times. We may
              experience hardware, software, network or other problems or need to perform
              maintenance related to the Site(s), resulting in interruptions, delays, or errors. We
              reserve the right to change, revise, update, suspend, discontinue, or otherwise modify
              the Site(s) or the Tools at any time or for any reason without notice to you. You
              agree that we have no liability whatsoever for any loss, damage, or inconvenience
              caused by your inability to access or use the Site(s) or the Tools during any downtime
              or discontinuance of the Site(s) or the Tools. Nothing in these Terms will be
              construed to obligate us to maintain and support the Site(s) or the Tools or to supply
              any corrections, updates, or releases in connection therewith.
            </p>
            <h2>YOUR OBLIGATIONS</h2>

            <h3>SITE REGISTRATION</h3>

            <p>
              You may be required to sign up for an account, select a password and username (“Giveth
              User ID”), and provide us with certain information or data, such as your contact
              information. In consideration of your use of the Site(s) and Tools, you represent that
              you are of legal age to form a binding contract and are not a person barred from
              receiving services under the laws of the United States or other applicable
              jurisdiction.
            </p>
            <p>
              If you’re agreeing to these Terms on behalf of an organization or entity, you
              represent and warrant that you are authorized to agree to these Terms on that
              organization’s or entity’s behalf and bind them to these Terms (in which case, the
              references to “you” and “your &quot; in these Terms, except for in this sentence,
              refer to that organization or entity).
            </p>
            <p>
              You promise to provide us with accurate, current, and complete registration about
              yourself and you will maintain the accuracy of such information and promptly update
              such registration information as necessary. If you provide any information that is
              untrue, inaccurate, not current, or incomplete, we have the right to suspend or
              terminate your account and refuse any and all current or future use of the Site(s) (or
              any portion thereof).
            </p>
            <p>
              You will not share your Giveth User ID, account or password with anyone, and you must
              protect the security of your Giveth User ID, account, password and any other access
              tools or credentials. You’re responsible for any activity associated with your Giveth
              User ID and account.
            </p>
            <p>
              You may not select as your Giveth User ID a name that you do not have the right to
              use, or another person’s name with the intent to impersonate that person. We reserve
              the right to remove, reclaim, or change a username you select if we determine, in our
              sole discretion, that such username is inappropriate, obscene, or otherwise
              objectionable. You may not transfer your account to anyone else without our prior
              written permission.
            </p>
            <h3>LEGAL REPRESENTATION</h3>

            <p>
              ​​The information provided on the Site(s) is not intended for distribution to or use
              by any person or entity in any jurisdiction or country where such distribution or use
              would be contrary to law or regulation or which would subject us to any registration
              requirement within such jurisdiction or country. Accordingly, those persons who choose
              to access the Site(s) from other locations do so on their own initiative and are
              solely responsible for compliance with local laws, if and to the extent local laws are
              applicable.
            </p>
            <p>
              You will only use the Tools in a manner that complies with all laws that apply to you.
              Any use by you of the Tools– whether as a Donor or as an Entity (each, as defined
              below) – including any failure to comply with the obligations, conditions and
              requirements set forth in these Terms must comply with all applicable laws that relate
              to the Donations (as defined below). If your use of the Tools is prohibited by
              applicable laws, then you aren’t authorized to use the Tools. If your use of the Tools
              is limited or conditioned by applicable laws, then you are only authorized to use the
              Tools if and when you fully comply with those limitations and conditions. We can’t and
              won’t be responsible for your using the Tools in a way that breaks the law.
            </p>
            <p>​</p>
            <p>
              You acknowledge and agree that any questions, comments, suggestions, ideas, feedback,
              or other information regarding the Site(s) or the Tools (&quot;Submissions&quot;)
              provided by you to us are non-confidential and shall become our sole property. You
              hereby waive all moral rights to any such Submissions, and you hereby warrant that any
              such Submissions are original with you or that you have the right to submit such
              Submissions. You agree there shall be no recourse against us for any alleged or actual
              infringement or misappropriation of any proprietary right in your Submissions.
            </p>
            <p>
              <strong>ARBITRATION NOTICE AND CLASS ACTION WAIVER: </strong>EXCEPT FOR CERTAIN TYPES
              OF DISPUTES DESCRIBED IN THE ARBITRATION AGREEMENT SECTION BELOW, YOU AGREE THAT
              DISPUTES BETWEEN YOU AND US WILL BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION AND
              YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE
              ARBITRATION.​
            </p>
            <h2>CHARITABLE ENTITIES AND DONORS</h2>

            <p>
              Giveth connects nonprofits, charitable individuals and organizations soliciting funds
              (“Entities”) with those looking to donate cryptocurrency to such Entities (“Donors”).
              When we use the word “you” in these Terms, it refers to any user, regardless of
              whether they are a Donor or are using the Tools on behalf of Entities or a Donor.
            </p>
            <p>
              We make no representations as to the safety, effectiveness, adequacy, accuracy,
              ratings, reviews, or legality of any of the information contained on the Site(s) or
              the Tools provided through the Site(s). You understand and agree that the content of
              the Site(s) does not contain or constitute representations to be reasonably relied
              upon, and you agree to hold us harmless from any errors, omissions, or
              misrepresentations contained within the Site’s content.
            </p>
            <h3>​PROJECT VERIFICATION</h3>

            <p>
              Giveth takes steps to confirm each Verified project that claims to be a nonprofit is a
              registered nonprofit organization by confirming the tax ID number. In the US, these
              nonprofit organizations are tax-exempt under section 501(c)(x) of the Internal Revenue
              Code. For international organizations, we confirm they are the equivalent of a
              501(c)(x) organization and confirm they are registered in their respective countries.
            </p>
            <p>
              However, each Donor must make its own determinations that an Entity requesting
              contributions through our Tools is suitable for such Donor (and eligible to accept
              cryptocurrency as a donation). Giveth is only responsible for connecting Entities and
              Donors, and is not and will not be responsible for the use of any Donations. Giveth
              similarly is not and will not be responsible for ensuring that information (including
              credentials) an Entity or Donor provides is accurate or up-to-date. We don’t control
              the actions of any Entities or Donors.
            </p>
            <h2>CONTENT AND USER SUBMISSIONS</h2>

            <h3>COMMERCIAL USE PROHIBITED</h3>

            <p>
              The material text, images, video, sound and referential data (Content) is provided on
              the Site(s) “AS IS” for your information and personal use only. Except as expressly
              provided in these Terms of Use, no part of the Site(s) or Tools may be copied,
              reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded,
              translated, transmitted, distributed, sold, licensed, or otherwise exploited for any
              commercial purpose whatsoever, without our express prior written permission.
            </p>
            <h3>INTELLECTUAL PROPERTY RIGHTS</h3>

            <p>
              You represent, warrant, and agree that you will not contribute any Content or User
              Submission (summarily, Contributions; each of those terms is defined severally below)
              or otherwise use or interact with the Tools in a manner that:
            </p>
            <ol>
              <li>
                infringes or violates the intellectual property rights or any other rights of anyone
                else (including Giveth);
              </li>

              <li>
                violates any law or regulation, including, without limitation, any applicable export
                control laws, privacy laws or any other purpose not reasonably intended by Giveth;
              </li>

              <li>
                is dangerous, harmful, fraudulent, deceptive, threatening, harassing, defamatory,
                obscene, or otherwise objectionable;
              </li>

              <li>
                uses any information obtained from the Site(s) in order to harass, abuse, or harm
                another person in public or in private.
              </li>

              <li>
                uses sexualized language or imagery, and sexual attention or advances of any kind.
              </li>

              <li>
                uses trolling, insulting or derogatory comments, and personal or political attacks.
              </li>

              <li>
                jeopardizes the security of your Giveth User ID, account or anyone else’s (such as
                allowing someone else to log in to the Site(s) as you), selling or otherwise
                transferring your profile.
              </li>

              <li>
                attempts, in any manner, to obtain the password, account, or other security
                information from any other user.
              </li>

              <li>
                attempts to impersonate another user or person or use the username of another user.
              </li>

              <li>
                makes any unauthorized use of the Tools, including collecting usernames and/or email
                addresses of users by electronic or other means for the purpose of sending
                unsolicited email, or creating user accounts by automated means or under false
                pretenses.
              </li>

              <li>
                violates the security of any computer network, or cracks any passwords or security
                encryption codes;
              </li>

              <li>
                circumvent, disable, or otherwise interfere with security-related features of the
                Site, including features that prevent or restrict the use or copying of any Content
                or enforce limitations on the use of the Site(s) and/or the Content contained
                therein.
              </li>

              <li>
                attempts to bypass any measures of the Site(s) designed to prevent or restrict
                access to the Site, or any portion of the Site.
              </li>

              <li>
                runs Maillist, Listserv, any form of auto-responder or “spam” on the Services, or
                any processes that run or are activated while you are not logged into the Site(s),
                or that otherwise interfere with or disrupt the proper working of the networks or
                the Tools (including by placing an unreasonable load on the infrastructure);
              </li>

              <li>
                accesses the Site(s) or the Tools through automated or non-human means, whether
                through a bot, script or otherwise, “crawls,” “scrapes,” or “spiders”, data mining,
                robots, or similar data gathering and extraction tools.of any page, data, or portion
                of or relating to the Site(s) or Content (through use of manual or automated means);
              </li>

              <li>
                systematically retrieve data or other Content from the Site(s) to create or compile,
                directly or indirectly, a collection, compilation, database, or directory without
                written permission from us.
              </li>

              <li>
                uploads or transmit (or attempt to upload or to transmit) any material that acts as
                a passive or active information collection or transmission mechanism, including
                without limitation, clear graphics interchange formats (“gifs”), 1×1 pixels, web
                bugs, cookies, or other similar devices (sometimes referred to as “spyware” or
                “passive collection mechanisms” or “pcms”).
              </li>

              <li>
                uploads or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or
                other material, including excessive use of capital letters and spamming (continuous
                posting of repetitive text), that interferes with any party’s uninterrupted use and
                enjoyment of the Site(s) or modifies, impairs, disrupts, alters, or interferes with
                the use, features, functions, operation, or maintenance of the Tools.
              </li>

              <li>
                using the Tools as part of any effort to compete with us or otherwise use the
                Site(s) and/or the Content for any revenue-generating endeavor or commercial
                enterprise.
              </li>

              <li>copies or stores any significant portion of the Content;</li>

              <li>
                publishes others’ private information, such as a physical or email address, without
                their explicit permission (commonly called doxing).
              </li>

              <li>
                deletes the copyright or other proprietary rights notice from any Content,
                decompiles, reverse engineers, or otherwise attempts to obtain the source code or
                underlying ideas or information of or relating to the Tools.
              </li>

              <li>
                among unauthorized Content are the following: illegal drugs or other illegal
                products; and pornography or graphic adult content, or images.
              </li>

              <li>uses the Site(s) to advertise or offer to sell goods and services.</li>

              <li>
                makes improper use of our support services or submit false reports of abuse or
                misconduct.
              </li>

              <li>
                harasses, annoy, intimidate, or threaten any of our employees or agents engaged in
                supporting your use of any portion of the Tools.
              </li>

              <li>disparage, tarnish, or otherwise harm, in our opinion, us and/or the Site.</li>

              <li>
                use the Site(s) in a manner inconsistent with any applicable laws or regulations.
              </li>

              <li>
                uses any other conduct which could reasonably be considered inappropriate in a
                professional setting.
              </li>
            </ol>

            <p>
              A violation of any of the foregoing is grounds for termination of your account and a
              lifetime ban from use of the Site(s) and your right to use or access the Tools. For
              more information on our Covenant, please click{' '}
              <a
                style={tosStyle.a}
                href='https://docs.giveth.io/whatisgiveth/covenant'
                target='_blank'
                rel='noopener noreferrer'
              >
                here
              </a>
              .
            </p>
            <h2>RIGHTS OF REGISTERED USERS</h2>

            <p>
              By posting your Contributions to any part of the Site(s) or making Contributions
              accessible to the Site(s) by linking your account from the Site(s) to any of your
              social networking accounts, you automatically grant, and you represent and warrant
              that you have the right to grant, to us a perpetual, non-exclusive, worldwide right,
              and license to host, use, copy, reproduce, disclose, publish, broadcast, retitle,
              archive, store, cache, publicly display, reformat, translate, transmit, excerpt (in
              whole or in part), and distribute such Contributions (including, without limitation,
              your image and voice) for the purpose of promoting charitable contributions, and to
              prepare derivative works of, or incorporate into other works, such Contributions. The
              use and distribution may occur in any media formats and through any media channels.
            </p>
            <p>
              Subject to these Terms, we grant each user of the Tools a worldwide, non-exclusive,
              non-sublicensable and non-transferable license to use (i.e., to download and display
              locally) Content solely for purposes of using the Tools. This license will apply to
              any form, media, or technology now known or hereafter developed, and includes our use
              of your name, company name, and franchise name, as applicable, and any of the
              trademarks, service marks, trade names, logos, and personal and commercial images you
              provide.
            </p>
            <p>
              You waive all moral rights in your Contributions, and you warrant that moral rights
              have not otherwise been asserted in your Contributions. Use, reproduction,
              modification, distribution or storage of any Content for any purpose other than using
              the Tools is expressly prohibited without prior written permission from us. You won’t
              modify, publish, transmit, participate in the transfer or sale of, reproduce (except
              as expressly provided in this Section), create derivative works based on, or otherwise
              exploit any of the Services. The Services may allow you to copy or download certain
              Content, but please remember that even where these functionalities exist, all the
              restrictions in this section still apply.
            </p>
            <h3>THIRD-PARTY SERVICES</h3>
            <p>
              The Tools may contain links or connections to third-party websites or services that
              are not owned or controlled by Giveth. When you access third-party websites or use
              third-party services, you accept that there are risks in doing so, and that Giveth is
              not responsible for such risks.
            </p>
            <p>
              Giveth has no control over, and assumes no responsibility for, the Content, accuracy,
              privacy policies, or practices of or opinions expressed in any third-party websites or
              by any third party that you interact with through the Services. In addition, Giveth
              will not and cannot monitor, verify, censor or edit the Content of any third-party
              site or service. We encourage you to be aware when you leave the Sites and to read the
              terms and conditions and privacy policy of each third-party website or service that
              you visit or utilize. By using the Tools, you release and hold us harmless from any
              and all liability arising from your use of any third-party website or service.
            </p>
            <p>
              If there is a dispute between participants on this site or Tools, or between users and
              any third party, you agree that Giveth is under no obligation to become involved. In
              the event that you have a dispute with one or more other users, you release Giveth,
              its founders, stewards, contributors, employees, agents, and successors from claims,
              demands, and damages of every kind or nature, known or unknown, suspected or
              unsuspected, disclosed or undisclosed, arising out of or in any way related to such
              disputes and/or our Tools.
            </p>
            <p>
              As part of the functionality of the Site(s), you may link your account with online
              accounts you have with third-party service providers (each such account, a
              “Third-Party Account”) by either: (1) providing your Third-Party Account login
              information through the Site(s); or (2) allowing us to access your Third-Party
              Account, as is permitted under the applicable terms and conditions that govern your
              use of each Third-Party Account. You represent and warrant that you are entitled to
              disclose your Third-Party Account login information to us and/or grant us access to
              your Third-Party Account, without breach by you of any of the terms and conditions
              that govern your use of the applicable Third-Party Account, and without obligating us
              to pay any fees or making us subject to any usage limitations imposed by the
              third-party service provider of the Third-Party Account. By granting us access to any
              Third-Party Accounts, you understand that (1) we may access, make available, and store
              (if applicable) any Content that you have provided to and stored in your Third-Party
              Account (the “Social Network Content”) so that it is available on and through the
              Site(s) via your account, including without limitation any friend lists and (2) we may
              submit to and receive from your Third-Party Account additional information to the
              extent you are notified when you link your account with the Third-Party Account.
              Depending on the Third-Party Accounts you choose and subject to the privacy settings
              that you have set in such Third-Party Accounts, personally identifiable information
              that you post to your Third-Party Accounts may be available on and through your
              account on the Site(s). Please note that if a Third-Party Account or associated
              service becomes unavailable or our access to such Third-Party Account is terminated by
              the third-party service provider, the Social Network Content may no longer be
              available on and through the Site(s). You will have the ability to disable the
              connection between your account on the Site(s) and your Third-Party Accounts at any
              time.
            </p>
            <p>
              PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS ASSOCIATED
              WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH
              THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any Social Network Content
              for any purpose, including but not limited to, for accuracy, legality, or
              non-infringement, and we are not responsible for any Social Network Content. You can
              deactivate the connection between the Site(s) and your Third-Party Account by
              contacting us using the contact information below or through your account settings (if
              applicable). We will attempt to delete any information stored on our servers that was
              obtained through such a Third-Party Account, except the username, profile picture, and
              ethereum wallet(s) that become associated with your account.
            </p>
            <p>
              The Site(s) may contain (or you may be sent via the Site(s) or Tool(s) links to other
              websites (&quot;Third-Party Websites&quot;) as well as articles, photographs, text,
              graphics, pictures, designs, music, sound, video, information, applications, software,
              and other Content or items belonging to or originating from third parties
              (&quot;Third-Party Content&quot;). Such Third-Party Websites and Third-Party Content
              are not investigated, monitored, or checked for accuracy, appropriateness, or
              completeness by us, and we are not responsible for any Third Party Websites accessed
              through the Site(s) or any Third-Party Content posted on, available through, or
              installed from the Site, including the Content, accuracy, offensiveness, opinions,
              reliability, privacy practices, or other policies of or contained in the Third-Party
              Websites or the Third-Party Content. Inclusion of, linking to, or permitting the use
              or installation of any Third-Party Websites or any Third-Party Content does not imply
              approval or endorsement thereof by us.
            </p>
            <p>
              If you decide to leave the Site(s) and access the Third-Party Websites or to use or
              install any Third-Party Content, you do so at your own risk, and you should be aware
              these Terms no longer govern. You should review the applicable terms and policies,
              including privacy and data gathering practices, of any website to which you navigate
              from the Site(s) or relating to any applications you use or install from the Site(s).
              Any purchases you make through Third-Party Websites will be through other websites and
              from other companies, and we take no responsibility whatsoever in relation to such
              purchases which are exclusively between you and the applicable third party. You agree
              and acknowledge that we do not endorse the products or services offered on Third-Party
              Websites and you shall hold us harmless from any harm caused by your purchase of such
              products or services. Additionally, you shall hold us harmless from any losses
              sustained by you or harm caused to you relating to or resulting in any way from any
              Third-Party Content or any contact with Third-Party Websites.
            </p>
            <h3>RESPONSIBILITY FOR CONTENT</h3>

            <p>
              Any information or Content publicly posted or privately transmitted through the
              Site(s) and Tools is the sole responsibility of the person from whom such Content
              originated, and you access all such information and Content at your own risk. We
              aren’t liable for any errors or omissions in that information or Content or for any
              damages or loss you might suffer in connection with it. We cannot control and have no
              duty to take any action regarding how you may interpret and use the Content or what
              actions you may take as a result of having been exposed to the Content, and you hereby
              release us from all liability for you having acquired or not acquired Content through
              the Tools. We can’t guarantee the identity of any users with whom you interact in
              using the Tools and are not responsible for which users gain access to the Sites.
            </p>
            <p>
              You are responsible for all Content you contribute, in any manner, to the Sites and
              Tools, and you represent and warrant you have all rights necessary to do so, in the
              manner in which you contribute it.
            </p>
            <p>
              We do not assert any ownership over your Contributions. You retain full ownership of
              all of your Contributions and any intellectual property rights or other proprietary
              rights associated with your Contributions. We are not liable for any statements or
              representations in your Contributions provided by you in any area on the Site. You are
              solely responsible for your Contributions to the Site(s) and you expressly agree to
              exonerate us from any and all responsibility and to refrain from any legal action
              against us regarding your Contributions.
            </p>
            <p>
              We have the right, in our sole and absolute discretion, (1) to edit, redact, or
              otherwise change any Contributions; (2) to re-categorize any Contributions to place
              them in more appropriate locations on the Site(s); and (3) to pre-screen or delete any
              Contributions at any time and for any reason, at our sole discretion, without notice.
              We have no obligation to monitor your Contributions or update any information on our
              Site(s).
            </p>
            <p>
              There may be information on the Site(s) that contains typographical errors,
              inaccuracies, or omissions that may relate to the Tools. We reserve the right to
              correct any errors, inaccuracies, or omissions and to change or update the information
              on the Site(s) at any time, without prior notice.
            </p>
            <p>
              We will maintain certain data that you transmit to the Site(s) for the purpose of
              managing the performance of the Tools, as well as data relating to your use of the
              Site(s). Although we perform regular routine backups of data, you are solely
              responsible for all data that you transmit or that relates to any activity you have
              undertaken using the Tools. You agree that we shall have no liability to you for any
              loss or corruption of any such data, and you hereby waive any right of action against
              us arising from any such loss or corruption of such data.
            </p>
            <p>
              You shall and hereby do waive California Civil Code Section 1542 or any similar law of
              any jurisdiction, which says in substance: “A general release does not extend to
              claims that the creditor or releasing party does not know or suspect to exist in his
              or her favor at the time of executing the release and that, if known by him or her,
              would have materially affected his or her settlement with the debtor or released
              party.”
            </p>
            <h2>
              <strong>TERMINATION OF USE </strong>
            </h2>

            <p>
              You’re free to stop using the Site(s) and/or Tools at any time by contacting us at
              <a
                style={tosStyle.a}
                href='mailto:info@giveth.io'
                target='_blank'
                rel='noopener noreferrer'
              >
                info@giveth.io
              </a>
              ; please refer to our{' '}
              <a style={tosStyle.a} href='#privacyPolicy' target='_blank' rel='noopener noreferrer'>
                Privacy Policy
              </a>
              , as well as the licenses above, to understand how we treat information you provide to
              us after you have stopped using our Tools.
            </p>
            <p>
              Giveth is also free to terminate (or suspend access to) your use of the Site(s),
              Tools, or your account for any reason at our discretion, including your breach of
              these Terms. Giveth has the sole right to decide whether you are in violation of any
              of the restrictions set forth in these Terms; for example, a Donor who believes that
              an Organization may be in breach of these Terms is not able to enforce these Terms
              against that Organization.
            </p>
            <p>
              Account termination may result in destruction of any Content associated with your
              account, so keep that in mind before you decide to terminate your account.
            </p>
            <p>
              If we terminate or suspend your account for any reason, you are prohibited from
              registering and creating a new account under your name, a fake or borrowed name, or
              the name of any third party, even if you may be acting on behalf of the third party.
            </p>
            <p>
              If you have deleted your account by mistake, contact us immediately at info@giveth.io
              – we will try to help, but unfortunately, we can’t promise that we can recover or
              restore anything.
            </p>
            <p>
              Provisions that, by their nature, should survive termination of these Terms shall
              survive termination. By way of example, all of the following will survive termination:
              any obligation you have to pay us or indemnify us, any limitations on our liability,
              any terms regarding ownership or intellectual property rights, and terms regarding
              disputes between us, including without limitation to, the arbitration agreement.
            </p>
            <h2>
              <strong>ADDITIONAL INFORMATION</strong>
            </h2>

            <p>
              We reserve the right, but not the obligation, to: (1) monitor the Site(s) for
              violations of these Terms; (2) take appropriate legal action against anyone who, in
              our sole discretion, violates the law or these Terms, including without limitation to,
              reporting such user to law enforcement authorities; (3) in our sole discretion and
              without limitation, refuse, restrict access to, limit the availability of, or disable
              (to the extent technologically feasible) any of your Contributions or any portion
              thereof; (4) in our sole discretion and without limitation, notice, or liability, to
              remove from the Site(s) or otherwise disable all files and content that are excessive
              in size or are in any way burdensome to our systems; and (5) otherwise manage the
              Site(s) in a manner designed to protect our rights and property and to facilitate the
              proper functioning of the Site(s) and the Tools.
            </p>
            <h3>WARRANTY DISCLAIMER</h3>

            <p>
              Giveth and its suppliers, partners or affiliated entities, and each of their
              respective officers, directors, members, employees, consultants, contract employees,
              representatives and agents, and each of their respective successors and assigns
              (Giveth and all such parties together, “Giveth Parties”) make no representations or
              warranties concerning the Tools, including without limitation to, regarding any
              Content contained in or accessed through the Services, and Giveth Parties will not be
              responsible or liable for the accuracy, copyright compliance, legality, or decency of
              material contained in or accessed through the Services or any claims, actions, suits
              procedures, costs, expenses, damages or liabilities arising out of use of, or in any
              way related to your participation in, the Services, including any Donations. Giveth
              Parties make no representations or warranties regarding suggestions or recommendations
              of services or products offered or purchased through or in connection with the
              Services.
            </p>
            <p>
              <strong>
                THE SERVICES AND CONTENT ARE PROVIDED BY GIVETH PARTIES ON AN “AS-IS” BASIS, WITHOUT
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION,
                IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                NON-INFRINGEMENT, OR THAT USE OF THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE.
                SOME STATES DO NOT ALLOW LIMITATIONS ON HOW LONG AN IMPLIED WARRANTY LASTS, SO THE
                ABOVE LIMITATIONS MAY NOT APPLY TO YOU.{' '}
              </strong>
            </p>
            <h3>LIMITATION OF LIABILITY </h3>

            <p>
              TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, UNDER NO CIRCUMSTANCES AND UNDER NO
              LEGAL THEORY (INCLUDING, WITHOUT LIMITATION, TORT, CONTRACT, STRICT LIABILITY, OR
              OTHERWISE) SHALL ANY OF GIVETH PARTIES BE LIABLE TO YOU OR TO ANY OTHER PERSON FOR (A)
              ANY INDIRECT, SPECIAL, INCIDENTAL, PUNITIVE OR CONSEQUENTIAL DAMAGES OF ANY KIND,
              INCLUDING DAMAGES FOR LOST PROFITS, BUSINESS INTERRUPTION, LOSS OF DATA, LOSS OF
              GOODWILL, WORK STOPPAGE, ACCURACY OF RESULTS, OR COMPUTER FAILURE OR MALFUNCTION, (B)
              ANY SUBSTITUTE GOODS, SERVICES OR TECHNOLOGY, (C) ANY AMOUNT, IN THE AGGREGATE, IN
              EXCESS OF THE GREATER OF (I) ONE-HUNDRED ($100) DOLLARS OR (II) THE AMOUNTS PAID
              AND/OR PAYABLE BY YOU TO THE GIVING BLOCK IN CONNECTION WITH THE SERVICES IN THE
              TWELVE (12) MONTH PERIOD PRECEDING THIS APPLICABLE CLAIM OR (D) ANY MATTER BEYOND OUR
              REASONABLE CONTROL. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL
              OR CONSEQUENTIAL OR CERTAIN OTHER DAMAGES, SO THE ABOVE LIMITATION AND EXCLUSIONS MAY
              NOT APPLY TO YOU.
            </p>
            <h3>INDEMNIFICATION </h3>

            <p>
              To the fullest extent allowed by applicable law, you agree to indemnify and hold
              Giveth harmless from and against any and all claims, liabilities, damages (actual and
              consequential), losses and expenses (including attorneys’ fees) arising from or in any
              way related to any claims relating to (a) your use of the Tools (including any actions
              taken by a third party using your account), and (b) your violation of these Terms. In
              the event of such a claim, suit, or action (“Claim”), we will attempt to provide
              notice of the Claim to the contact information we have for your account (provided that
              failure to deliver such notice shall not eliminate or reduce your indemnification
              obligations hereunder).
            </p>
            <h3>​ASSIGNMENT</h3>
            <p>
              You may not assign, delegate or transfer these Terms or your rights or obligations
              hereunder, or your Services account, in any way (by operation of law or otherwise)
              without Giveth&apos;s prior written consent. We may transfer, assign, or delegate
              these Terms and our rights and obligations without consent.
            </p>
            <h3>CHOICE OF LAW</h3>

            <p>
              These Terms are governed by and will be construed under the Federal Arbitration Act,
              applicable federal law, and the laws of the State of Georgia, without regard to the
              conflicts of laws provisions thereof.
            </p>
            <h3>ARBITRATION AGREEMENT</h3>

            <p>
              Please read the following ARBITRATION AGREEMENT carefully because it requires you to
              arbitrate certain disputes and claims with Giveth and limits the manner in which you
              can seek relief from Giveth. Both you and Giveth acknowledge and agree that for the
              purposes of any dispute arising out of or relating to the subject matter of these
              Terms, Giveth&apos;s contributors and independent contractors (“Community”) are
              third-party beneficiaries of these Terms, and that upon your acceptance of these
              Terms, The Community will have the right (and will be deemed to have accepted the
              right) to enforce these Terms against you as the third-party beneficiary hereof.
            </p>
            <h4>(a) Arbitration Rules; Applicability of Arbitration Agreement</h4>

            <p>
              The parties shall use their best efforts to settle any dispute, claim, question, or
              disagreement arising out of or relating to the subject matter of these Terms directly
              through good-faith negotiations, which shall be a precondition to either party
              initiating arbitration. If such negotiations do not resolve the dispute, it shall be
              finally settled by binding arbitration in Cartersville, Georgia, U.S.A. The
              arbitration will proceed in the English language, in accordance with the JAMS
              Streamlined Arbitration Rules and Procedures (the “Rules”) then in effect, by one
              commercial arbitrator with substantial experience in resolving intellectual property
              and commercial contract disputes. The arbitrator shall be selected from the
              appropriate list of JAMS arbitrators in accordance with such Rules. Judgment upon the
              award rendered by such arbitrator may be entered in any court of competent
              jurisdiction.
            </p>
            <h4>(b) Costs of Arbitration</h4>

            <p>
              The Rules will govern payment of all arbitration fees. Giveth will pay all arbitration
              fees for claims less than seventy-five thousand ($75,000) dollars. Giveth will not
              seek its attorneys’ fees and costs in arbitration unless the arbitrator determines
              that your claim is frivolous.
            </p>
            <h4>(c) Small Claims Court; Infringement </h4>

            <p>
              Either you or Giveth may assert claims, if they qualify, in small claims court in
              Cartersville, Georgia, U.S.A. or any United States county where you live or work.
              Furthermore, notwithstanding the foregoing obligation to arbitrate disputes, each
              party shall have the right to pursue injunctive or other equitable relief at any time,
              from any court of competent jurisdiction, to prevent the actual or threatened
              infringement, misappropriation or violation of a party&apos;s copyrights, trademarks,
              trade secrets, patents or other intellectual property rights.
            </p>
            <h4>(d) Waiver of Jury Trial</h4>

            <p>
              YOU AND GIVETH WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A
              TRIAL IN FRONT OF A JUDGE OR JURY. You and Giveth are instead choosing to have claims
              and disputes resolved by arbitration. Arbitration procedures are typically more
              limited, more efficient, and less costly than rules applicable in court and are
              subject to very limited review by a court. In any litigation between you and Giveth
              over whether to vacate or enforce an arbitration award, YOU AND GIVETH WAIVE ALL
              RIGHTS TO A JURY TRIAL, and elect instead to have the dispute be resolved by a judge.
            </p>
            <h4>(e) Waiver of Class or Consolidated Actions</h4>

            <p>
              ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THIS ARBITRATION AGREEMENT MUST BE
              ARBITRATED OR LITIGATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS BASIS. CLAIMS OF
              MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR LITIGATED JOINTLY OR
              CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER. If however, this waiver of
              class or consolidated actions is deemed invalid or unenforceable, neither you nor
              Giveth is entitled to arbitration; instead all claims and disputes will be resolved in
              a court as set forth in (g) below.
            </p>
            <h4>(f) Opt-out</h4>

            <p>
              You have the right to opt out of the provisions of this Section by sending written
              notice of your decision to opt out to the following address: 475 E. Main St. #154
              Cartersville, GA 30121 postmarked within thirty (30) days of first accepting these
              Terms. You must include (i) your name and residence address, (ii) the email address
              and/or telephone number associated with your account, and (iii) a clear statement that
              you want to opt out of these Terms’ arbitration agreement.
            </p>
            <h4>(g) Exclusive Venue</h4>

            <p>
              If you send the opt-out notice in (f), and/or in any circumstances where the foregoing
              arbitration agreement permits either you or Giveth to litigate any dispute arising out
              of or relating to the subject matter of these Terms in court, then the foregoing
              arbitration agreement will not apply to either party, and both you and Giveth agree
              that any judicial proceeding (other than small claims actions) will be brought in the
              state or federal courts located in, respectively, Cartersville, Georgia, U.S.A., or
              the federal district in which that county falls.
            </p>
            <h4>(h) Severability</h4>

            <p>
              If the prohibition against class actions and other claims brought on behalf of third
              parties contained above is found to be unenforceable, then all of the preceding
              language in this Arbitration Agreement section will be null and void. This arbitration
              agreement will survive the termination of your relationship with Giveth.
            </p>
            <h4>(i) California users and Residents</h4>

            <p>
              <em>
                If any complaint with us is not satisfactorily resolved, you can contact the
                Complaint Assistance Unit of the Division of Consumer Services of the California
                Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112,
                Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
              </em>
            </p>
            <h3>Miscellaneous</h3>

            <p>
              You will be responsible for paying, withholding, filing, and reporting all taxes,
              duties, and other governmental assessments associated with your activity in connection
              with the Site(s), provided that Giveth may, in its sole discretion, do any of the
              foregoing on your behalf or for itself as it sees fit.
            </p>
            <p>
              The failure of either you or us to exercise, in any way, any right herein shall not be
              deemed a waiver of any further rights hereunder. If any provision or part of a
              provision of these Terms are found to be unlawful, void, unenforceable or invalid,
              that provision or part of a provision will be limited or eliminated, to the minimum
              extent necessary, so that these Terms shall otherwise remain in full force and
              validity and effect and enforceable of any remaining provisions.
            </p>
            <p>We may assign any or all of our rights and obligations to others at any time.</p>
            <p>
              We shall not be responsible or liable for any loss, damage, delay, or failure to act
              caused by any cause beyond our reasonable control.
            </p>
            <p>
              You hereby acknowledge and agree that you are not an employee, agent, partner, or
              joint venture of Giveth, and you do not have any authority of any kind to bind Giveth
              as a result of these Terms of Use or use of the Tools or in any respect whatsoever.
            </p>
            <p>
              Except as expressly set forth in the section above regarding the arbitration
              agreement, you and Giveth agree there are no third-party beneficiaries intended under
              these Terms.
            </p>
            <p>
              You agree that these Terms will not be construed against us by virtue of having
              drafted them.
            </p>
            <p>
              You hereby waive any and all defenses you may have based on the electronic form of
              these Terms and the lack of signing by the parties hereto to execute these Terms.
            </p>
            <p>
              You and Giveth agree that these Terms and any policies or operating rules posted by us
              on the Site(s) or in respect to the Contents are the complete and exclusive statement
              of the entire agreement and mutual understanding between you and Giveth, and that
              these Terms supersede and cancel all previous written and oral agreements,
              communications and other understandings relating to the subject matter of these Terms.
            </p>
          </section>

          <section id={'cookiePolicy'}>
            <h1 id='cookiePolicy'>
              <strong>COOKIE POLICY </strong>
            </h1>

            <h5>
              <i>Last updated: November 4, 2021</i>
            </h5>

            <h3>INTRODUCTION</h3>

            <p>
              Giveth (“we” or “us” or “our”) may use cookies, web beacons, tracking pixels, and
              other tracking technologies when you visit our website https://giveth.io, including
              any other media form, media channel, mobile website, or mobile application related or
              connected thereto (collectively, the “Site”) to help customize the Site and improve
              your experience.
            </p>
            <p>
              We reserve the right to make changes to this Cookie Policy at any time and for any
              reason. We will alert you about any changes by updating the “Last Updated” date of
              this Cookie Policy. Any changes or modifications will be effective immediately upon
              posting the updated Cookie Policy on the Site, and you waive the right to receive
              specific notice of each such change or modification.
            </p>
            <p>
              You are encouraged to periodically review this Cookie Policy to stay informed of
              updates. You will be deemed to have been made aware of, will be subject to, and will
              be deemed to have accepted the changes in any revised Cookie Policy by your continued
              use of the Site after the date such revised Cookie Policy is posted.
            </p>
            <h3>USE OF COOKIES</h3>
            <p>
              A “cookie” is a string of information which assigns you a unique identifier that we
              store on your computer. Your browser then provides that unique identifier to use each
              time you submit a query to the Site. We use cookies on the Site to, among other
              things, keep track of services you have used, record registration information, record
              your user preferences, keep you logged into the Site, facilitate purchase procedures,
              and track the pages you visit. Cookies help us understand how the Site is being used
              and improve your user experience.
            </p>
            <h3>TYPES OF COOKIES</h3>
            <p>The following types of cookies may be used when you visit the Site:</p>
            <h3>Analytics Cookies</h3>
            <p>
              Analytics cookies monitor how users reached the Site, and how they interact with and
              move around once on the Site. These cookies let us know what features on the Site are
              working the best and what features on the Site can be improved.
            </p>
            <h3>Our Cookies</h3>
            <p>
              Our cookies are “first-party cookies”, and can be either permanent or temporary. These
              are necessary cookies, without which the Site won&apos;t work properly or be able to
              provide certain features and functionalities. Some of these may be manually disabled
              in your browser, but may affect the functionality of the Site.
            </p>
            <h3>Personalization Cookies</h3>
            <p>
              Personalization cookies are used to recognize repeat visitors to the Site. We use
              these cookies to record your browsing history, the pages you have visited, and your
              settings and preferences each time you visit the Site.
            </p>
            <h3>Security Cookies</h3>
            <p>
              Security cookies help identify and prevent security risks. We use these cookies to
              authenticate users and protect user data from unauthorized parties.
            </p>
            <h3>Site Management Cookies</h3>
            <p>
              Site management cookies are used to maintain your identity or session on the Site so
              that you are not logged off unexpectedly, and any information you enter is retained
              from page to page. These cookies cannot be turned off individually, but you can
              disable all cookies in your browser.
            </p>
            <h3>Third-Party Cookies</h3>
            <p>
              Third-party cookies may be place on your computer when you visit the Site by companies
              that run certain services we offer. These cookies allow the third parties to gather
              and track certain information about you. These cookies can be manually disabled in
              your browser.
            </p>
            <h3>CONTROL OF COOKIES</h3>
            <p>
              Most browsers are set to accept cookies by default. However, you can remove or reject
              cookies in your browser’s settings. Please be aware that such action could affect the
              availability and functionality of the Site.
            </p>
            <p>
              For more information on how to control cookies, check your browser or device’s
              settings for how you can control or reject cookies, or visit the following links:
            </p>
            <p>
              <a
                style={tosStyle.a}
                href='https://support.apple.com/kb/ph19214?locale=en_US'
                target='_blank'
                rel='noopener noreferrer'
              >
                Apple Safari
              </a>
            </p>
            <p>
              <a
                style={tosStyle.a}
                href='https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&hl=en'
                target='_blank'
                rel='noopener noreferrer'
              >
                Google Chrome
              </a>
            </p>
            <p>
              <a
                style={tosStyle.a}
                href='https://privacy.microsoft.com/en-us/windows-10-microsoft-edge-and-privacy'
                target='_blank'
                rel='noopener noreferrer'
              >
                Microsoft Edge
              </a>
            </p>
            <p>
              <a
                style={tosStyle.a}
                href='https://support.microsoft.com/en-gb/help/17442/windows-internet-explorer-delete-manage-cookies'
                target='_blank'
                rel='noopener noreferrer'
              >
                Microsoft Internet Explorer
              </a>
            </p>
            <p>
              <a
                style={tosStyle.a}
                href='https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences'
                target='_blank'
                rel='noopener noreferrer'
              >
                Mozilla Firefox
              </a>
            </p>
            <p>
              <a
                style={tosStyle.a}
                href='http://www.opera.com/help/tutorials/security/cookies/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Opera
              </a>
            </p>
            <p>
              <a
                style={tosStyle.a}
                href='https://support.brave.com/hc/en-us/articles/360050634931-How-Do-I-Manage-Cookies-In-Brave-'
                target='_blank'
                rel='noopener noreferrer'
              >
                Brave Browser
              </a>
            </p>
            <p>
              <a
                style={tosStyle.a}
                href='https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DAndroid&hl=en&oco=1'
                target='_blank'
                rel='noopener noreferrer'
              >
                Android (Chrome)
              </a>
            </p>
            <p>
              <a
                style={tosStyle.a}
                href='https://help.blackberry.com/en/blackberry-classic/10.3.1/help/mwa1334238823957.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                Blackberry
              </a>
            </p>
            <p>
              <a
                style={tosStyle.a}
                href='https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DiOS&hl=en&oco=1'
                target='_blank'
                rel='noopener noreferrer'
              >
                Iphone or Ipad (Chrome)
              </a>
            </p>
            <p>
              <a
                style={tosStyle.a}
                href='https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DAndroid&hl=en&oco=1'
                target='_blank'
                rel='noopener noreferrer'
              >
                Iphone or Ipad (Safari)
              </a>
            </p>
            <p>
              In addition, you may opt-out of some third-party cookies through the{' '}
              <a
                style={tosStyle.a}
                href='http://optout.networkadvertising.org/#!/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Network Advertising Initiative’s Opt-Out Tool
              </a>
              .
            </p>
            <p>
              <strong>OTHER TRACKING TECHNOLOGIES</strong>
            </p>
            <p>
              In addition to cookies, we may use web beacons, pixel tags, and other tracking
              technologies on the Site to help customize the Site and improve your experience. A
              “web beacon” or “pixel tag” is a tiny object or image embedded in a web page or email.
              They are used to track the number of users who have visited particular pages and
              viewed emails, and acquire other statistical data. They collect only a limited set of
              data, such as a cookie number, time and date of page or email view, and a description
              of the page or email on which they reside. Web beacons and pixel tags cannot be
              declined. However, you can limit their use by controlling the cookies that interact
              with them.
            </p>
            <p>
              <strong>PRIVACY POLICY</strong>
            </p>
            <p>
              For more information about how we use information collected by cookies and other
              tracking technologies, please refer to our{' '}
              <a style={tosStyle.a} href='#privacyPolicy'>
                Privacy Policy
              </a>
              . This Cookie Policy is part of and is incorporated into our Privacy Policy. By using
              the Site, you agree to be bound by this Cookie Policy and our Privacy Policy.
            </p>
            <p>
              <strong>CONTACT US</strong>
            </p>
            <p>
              If you have questions or comments about this Cookie Policy, please contact us on the
              support channel in our Discord server:{' '}
              <a
                style={tosStyle.a}
                href='https://discord.gg/TeWHtAjNQT'
                target='_blank'
                rel='noopener noreferrer'
              >
                https://discord.gg/TeWHtAjNQT
              </a>
              .
            </p>
          </section>
          <section id='privacyPolicy'>
            <h1>
              <strong>PRIVACY POLICY</strong>
            </h1>

            <strong>PRIVACY NOTICE</strong>

            <h5>Last updated: November 5, 2021</h5>
            <p>
              Thank you for choosing to be part of our community at Giveth (&quot;
              <strong>we</strong>&quot;, &quot;
              <strong>us</strong>&quot;, &quot;<strong>our</strong>&quot;). We are committed to
              protecting your personal information and your right to privacy. If you have any
              questions or concerns about this privacy notice, or our practices with regards to your
              personal information, please contact us at the support channel on our Discord server:
              <a
                style={tosStyle.a}
                href='https://discord.gg/TeWHtAjNQT'
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                https://discord.gg/TeWHtAjNQT
              </a>
              .
            </p>
            <p>
              When you visit our website
              <a
                style={tosStyle.a}
                href='https://giveth.io/'
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                https://giveth.io
              </a>{' '}
              (the &quot;
              <strong>Website</strong>&quot;), and more generally, use any of our services (the
              &quot;
              <strong>Services</strong>&quot;, which include the Website), we appreciate that you
              are trusting us with some personal information. We take your privacy very seriously.
              In this privacy notice, we seek to explain to you in the clearest way possible what
              information we collect, how we use it and what rights you have in relation to it. We
              hope you take some time to read through it carefully, as it is important. If there are
              any terms in this privacy notice that you do not agree with, please discontinue use of
              our Services immediately.
            </p>
            <p>
              This privacy notice applies to all information collected through our Services (which,
              as described above, includes our Website), as well as, any related services. Please be
              mindful that the use of third-party applications means that although you may not share
              information with us directly, you may be sharing information with third-parties.
            </p>
            <p>
              <strong>
                Please read this privacy notice carefully as it will help you understand what we do
                with the information to the extent we ever have it.
              </strong>
            </p>
            <h2>TABLE OF CONTENTS</h2>
            <ol style={{ lineHeight: 2 }}>
              <li>
                <a style={tosStyle.a} href='#pp1'>
                  WHAT INFORMATION DO WE COLLECT?
                </a>
              </li>
              <li>
                <a style={tosStyle.a} href='#pp2'>
                  HOW DO WE USE YOUR INFORMATION?
                </a>
              </li>
              <li>
                <a style={tosStyle.a} href='#pp3'>
                  WILL YOUR INFORMATION BE SHARED WITH ANYONE?
                </a>
              </li>
              <li>
                <a style={tosStyle.a} href='#pp4'>
                  WHO WILL YOUR INFORMATION BE SHARED WITH?
                </a>
              </li>
              <li>
                <a style={tosStyle.a} href='#pp5'>
                  HOW LONG DO WE KEEP YOUR INFORMATION?
                </a>
              </li>
              <li>
                <a style={tosStyle.a} href='#pp6'>
                  HOW DO WE KEEP YOUR INFORMATION SAFE?
                </a>
              </li>
              <li>
                <a style={tosStyle.a} href='#pp7'>
                  DO WE COLLECT INFORMATION FROM MINORS?
                </a>
              </li>
              <li>
                <a style={tosStyle.a} href='#pp8'>
                  WHAT ARE YOUR PRIVACY RIGHTS?
                </a>
              </li>
              <li>
                <a style={tosStyle.a} href='#pp9'>
                  CONTROLS FOR DO-NOT-TRACK FEATURES
                </a>
              </li>
              <li>
                <a style={tosStyle.a} href='#pp10'>
                  DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                </a>
              </li>
              <li>
                <a style={tosStyle.a} href='#pp11'>
                  DO WE MAKE UPDATES TO THIS NOTICE?
                </a>
              </li>
              <li>
                <a style={tosStyle.a} href='#pp12'>
                  HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                </a>
              </li>
              <li>
                <a style={tosStyle.a} href='#pp13'>
                  HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?
                </a>
              </li>
            </ol>
            <h3 id='pp1'>1. WHAT INFORMATION DO WE COLLECT?</h3>
            <p>
              <strong>Personal information you disclose to us</strong>
            </p>
            <p>
              <strong>
                <em>
                  In Short: We collect almost no personal information about you without your
                  knowledge.
                </em>
              </strong>
            </p>
            <p>
              We collect personal information that you voluntarily provide to us when you express an
              interest in obtaining information about us or our products and Services, when you
              participate in activities on the Website or otherwise when you contact us. For
              example, we may know your name and email address if and when you provide it to us.
              Additionally, should you interact with a supported wallet with Giveth, your public
              address will be visible on the blockchain.
            </p>
            <p>
              The personal information that we have depends on the context of your interactions with
              us and the Website, the choices you make and the products and features you use. The
              personal information we have may include the following:
            </p>
            <p>
              <strong>Personal Information Provided by You</strong>. Services that we may use,
              including, but not limited to Sourcecred, Github, Discord, Twitter, and Telegram may
              be used to collect names; phone numbers; email addresses; mailing addresses;
              usernames; passwords; contact preferences; wallet addresses; and other similar
              information.
            </p>
            <p>
              All personal information that you provide to us must be true, complete and accurate,
              and you must notify us of any changes to such personal information.
            </p>
            <p>
              <strong>Information automatically collected</strong>
            </p>
            <p>
              <strong>
                <em>
                  In Short: Some information — such as your Internet Protocol (IP) address and/or
                  browser and device characteristics — is collected automatically when you visit our
                  Website.
                </em>
              </strong>
            </p>
            <p>
              We automatically collect certain information when you visit, use or navigate the
              Website. This information does not reveal your specific identity (like your name or
              contact information) but may include device and usage information, such as your IP
              address, browser and device characteristics, operating system, language preferences,
              referring URLs, device name, country, location, information about how and when you use
              our Website and other technical information. This information is primarily needed to
              maintain the security and operation of our Website, and for our internal analytics and
              reporting purposes.
            </p>
            <p>
              <strong>Information collected from other sources</strong>
            </p>
            <p>
              <strong>
                <em>
                  In Short: We may collect limited data from public databases, marketing partners,
                  and other outside sources.
                </em>
              </strong>
            </p>
            <p>
              In order to enhance our ability to provide relevant marketing, offers and services to
              you and update our records, we may obtain information about you from other sources,
              such as public databases, joint marketing partners, affiliate programs, data
              providers, as well as from other third parties. This information includes mailing
              addresses, job titles, email addresses, phone numbers, intent data (or user behavior
              data), Internet Protocol (IP) addresses, social media profiles, social media URLs and
              custom profiles, for purposes of informing the relevant members of our community of
              important votes and events.
            </p>
            <p>
              <h3 id='pp2'>2. HOW DO WE USE YOUR INFORMATION?</h3>
            </p>
            <p>
              <strong>
                <em>
                  In Short: We process your information for purposes based on legitimate
                  organizational interests, the fulfillment of our obligations with you, compliance
                  with our legal obligations, and/or your consent.
                </em>
              </strong>
            </p>
            <p>
              We use personal information collected via our Website or platforms for a variety of
              purposes described below. We process your personal information for these purposes in
              reliance on our legitimate organizational interests, in order to enter into or perform
              a contract with you, with your consent, and/or for compliance with our legal
              obligations. We indicate the specific processing grounds we rely on next to each
              purpose listed below.
            </p>
            <p>We use the information we collect or receive:</p>
            <ul>
              <li>
                <strong>To send administrative information to you.</strong> We may use your personal
                information to send you product, service and new feature information and/or
                information about changes to our terms, conditions, and policies.
              </li>

              <li>
                <strong>To protect our Services.</strong> We may use your information as part of our
                efforts to keep our site safe and secure (for example, for fraud monitoring and
                prevention).
              </li>

              <li>
                <strong>
                  To enforce our terms, conditions and policies for business purposes, to comply
                  with legal and regulatory requirements or in connection with our contract.
                </strong>
              </li>

              <li>
                <strong>To respond to legal requests and prevent harm.</strong> If we receive a
                subpoena or other legal request, we may need to inspect the data we hold to
                determine how to respond.
              </li>

              <li>
                <strong>To send you marketing and promotional communications.</strong> We and/or our
                third-party marketing partners may use the personal information you send to us for
                our marketing purposes, if this is in accordance with your marketing preferences.
                For example, when expressing an interest in obtaining information about us or our
                Website, subscribing to marketing or otherwise contacting us, we will collect
                personal information from you. You can opt-out of our marketing emails at any time
                (see the &quot;WHAT ARE YOUR PRIVACY RIGHTS?&quot; below).
              </li>

              <li>
                <strong>Deliver targeted advertising to you.</strong> We may use your information to
                develop and display personalized content and advertising (and work with third
                parties who do so) tailored to your interests and/or location and to measure its
                effectiveness.
              </li>
            </ul>
            <h3 id='pp3'>3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</h3>
            <p>
              <strong>
                <em>
                  In Short: We only share information with your consent, to comply with laws, to
                  provide you with services, to protect your rights, or to fulfill obligations.
                </em>
              </strong>
            </p>
            <p>
              We may process or share your data that we hold based on the following legal basis:
            </p>
            <ul>
              <li>
                <strong>Consent</strong>: We may process your data if you have given us specific
                consent to use your personal information for a specific purpose.
              </li>

              <li>
                <strong>Legitimate Interests: </strong>We may process your data when it is
                reasonably necessary to achieve our legitimate organizational interests.
              </li>

              <li>
                <strong>Performance of a Contract:</strong> Where we have entered into a contract
                with you, we may process your personal information to fulfill the terms of our
                contract.
              </li>

              <li>
                <strong>Legal Obligations: </strong>We may disclose your information where we are
                legally required to do so in order to comply with applicable law, governmental
                requests, a judicial proceeding, court order, or legal process, such as in response
                to a court order or a subpoena (including in response to public authorities to meet
                national security or law enforcement requirements).
              </li>

              <li>
                <strong>Vital Interests: </strong>We may disclose your information where we believe
                it is necessary to investigate, prevent, or take action regarding potential
                violations of our policies, suspected fraud, situations involving potential threats
                to the safety of any person and illegal activities, or as evidence in litigation in
                which we are involved. More specifically, we may need to process your data or share
                your personal information in the following situations:
              </li>
              <li>
                <strong>Business Transfers</strong>. We may share or transfer your information in
                connection with, or during negotiations of, any merger, sale of company assets,
                financing, or acquisition of all or a portion of our business to another company.
              </li>
              <li>
                <strong>Vendors, Consultants and Other Third-Party Service Providers.</strong> We
                may share your data with third-party vendors, service providers, contractors or
                agents who perform services for us or on our behalf and require access to such
                information to do that work. Examples include: payment processing, data analysis,
                email delivery, hosting services, customer service and marketing efforts. We may
                allow selected third parties to use tracking technology on the Website, which will
                enable them to collect data on our behalf about how you interact with our Website
                over time. This information may be used to, among other things, analyze and track
                data, determine the popularity of certain content, pages or features, and better
                understand online activity. Unless described in this notice, we do not share, sell,
                rent or trade any of your information with third parties for their promotional
                purposes. We have contracts in place with our data processors, which are designed to
                help safeguard your personal information. This means that they cannot do anything
                with your personal information unless we have instructed them to do it. They will
                also not share your personal information with any organization apart from us. They
                also commit to protect the data they hold on our behalf and to retain it for the
                period we instruct.
              </li>
            </ul>

            <h3 id='pp4'>4. WHO WILL YOUR INFORMATION BE SHARED WITH?</h3>
            <p>
              <strong>
                <em>
                  In Short: We only share information with the following categories of third
                  parties.
                </em>
              </strong>
            </p>
            <p>
              We only share and disclose your information with the following categories of third
              parties: Testing Tools
            </p>
            <ul>
              <li>Social Networks</li>

              <li>Performance Monitoring Tools</li>

              <li>Payment Processors</li>

              <li>Data Storage Service Providers</li>

              <li>Data Analytics Services</li>

              <li>Communication & Collaboration Tools</li>

              <li>Cloud Computing Services</li>
            </ul>
            <p>
              If we have processed your data based on your consent and you wish to revoke your
              consent, please contact us using the contact details provided in the section below
              titled &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot;.
            </p>
            <h3 id='pp5'>5. HOW LONG DO WE KEEP YOUR INFORMATION?</h3>
            <p>
              <strong>
                <em>
                  In Short: We keep your information for as long as necessary to fulfill the
                  purposes outlined in this privacy notice unless otherwise required by law.
                </em>
              </strong>
            </p>
            <p>
              We will only keep your personal information for as long as it is necessary for the
              purposes set out in this privacy notice, unless a longer retention period is required
              or permitted by law (such as tax, accounting or other legal requirements).
            </p>
            <p>
              When we have no ongoing legitimate organizational need to process your personal
              information, we will either delete or anonymize such information, or, if this is not
              possible (for example, because your personal information has been stored in backup
              archives), then we will securely store your personal information and isolate it from
              any further processing until deletion is possible.
            </p>
            <h3 id='pp6'>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</h3>
            <p>
              <strong>
                <em>
                  In Short: We aim to protect your personal information through a system of
                  organizational and technical security measures.
                </em>
              </strong>
            </p>
            <p>
              We have implemented appropriate technical and organizational security measures
              designed to protect the security of any personal information we process. However,
              despite our safeguards and efforts to secure your information, no electronic
              transmission over the Internet or information storage technology can be guaranteed to
              be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or
              other unauthorized third parties will not be able to defeat our security, and
              improperly collect, access, steal, or modify your information. Although we will do our
              best to protect your personal information, transmission of personal information to and
              from our Website is at your own risk. You should only access the Website within a
              secure environment.
            </p>
            <h3 id='pp7'>7. DO WE COLLECT INFORMATION FROM MINORS?</h3>
            <p>
              <strong>
                <em>
                  In Short: We do not knowingly collect data from or market to children under 18
                  years of age.
                </em>
              </strong>
            </p>
            <p>
              We do not knowingly solicit data from or market to children under 18 years of age. By
              using the Website, you represent that you are at least 18 or that you are the parent
              or guardian of such a minor and consent to such minor dependent’s use of the Website.
              If we learn that personal information from users less than 18 years of age has been
              collected, we will delete the data that it’s possible but we can’t stop the blockchain
              so any action taken without us knowing your age we are not responsible for. If you
              become aware of any data we may have collected from children under age 18, please
              contact us at the support channel on our discord server:
              <a
                style={tosStyle.a}
                href='https://discord.gg/TeWHtAjNQT'
                target='_blank'
                rel='noopener noreferrer'
              >
                https://discord.gg/TeWHtAjNQT
              </a>
            </p>
            <h3 id='pp8'>8. WHAT ARE YOUR PRIVACY RIGHTS?</h3>
            <p>
              <strong>
                <em>
                  In Short: In some regions, such as the European Economic Area (EEA) and United
                  Kingdom (UK), you have rights that allow you greater access to and control over
                  your personal information. You may review, change, or terminate your account at
                  any time.
                </em>
              </strong>
            </p>
            <p>
              In some regions (like the EEA and UK), you have certain rights under applicable data
              protection laws. These may include the right (i) to request access and obtain a copy
              of your personal information, (ii) to request rectification or erasure; (iii) to
              restrict the processing of your personal information; and (iv) if applicable, to data
              portability. In certain circumstances, you may also have the right to object to the
              processing of your personal information. To make such a request, please use the
              contact details provided below. We will consider and act upon any request in
              accordance with applicable data protection laws.
            </p>
            <p>
              If we are relying on your consent to process your personal information, you have the
              right to withdraw your consent at any time. Please note however that this will not
              affect the lawfulness of the processing before its withdrawal, nor will it affect the
              processing of your personal information conducted in reliance on lawful processing
              grounds other than consent.
            </p>
            <p>
              If you are a resident in the EEA or UK and you believe we are unlawfully processing
              your personal information, you also have the right to complain to your local data
              protection supervisory authority. You can find their contact details here:
              <a
                style={tosStyle.a}
                href='http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm'
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm
              </a>
              .
            </p>
            <p>
              If you are a resident in Switzerland, the contact details for the data protection
              authorities are available here:
              <a
                style={tosStyle.a}
                href='https://www.edoeb.admin.ch/edoeb/en/home.html'
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                https://www.edoeb.admin.ch/edoeb/en/home.html
              </a>
              .
            </p>
            <h3 id='pp9'>9. CONTROLS FOR DO-NOT-TRACK FEATURES</h3>
            <p>
              Most web browsers and some mobile operating systems and mobile applications include a
              Do-Not-Track (&quot;DNT&quot;) feature or setting you can activate to signal your
              privacy preference not to have data about your online browsing activities monitored
              and collected. At this stage no uniform technology standard for recognizing and
              implementing DNT signals has been finalized. As such, we do not currently respond to
              DNT browser signals or any other mechanism that automatically communicates your choice
              not to be tracked online. If a standard for online tracking is adopted that we must
              follow in the future, we will inform you about that practice in a revised version of
              this privacy notice.
            </p>
            <h3 id='pp10'>10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</h3>
            <p>
              <strong>
                <em>
                  In Short: Yes, if you are a resident of California, you are granted specific
                  rights regarding access to your personal information.
                </em>
              </strong>
            </p>
            <p>
              California Civil Code Section 1798.83, also known as the &quot;Shine The Light&quot;
              law, permits our users who are California residents to request and obtain from us,
              once a year and free of charge, information about categories of personal information
              (if any) we disclosed to third parties for direct marketing purposes and the names and
              addresses of all third parties with which we shared personal information in the
              immediately preceding calendar year. If you are a California resident and would like
              to make such a request, please submit your request in writing to us using the contact
              information provided below.
            </p>
            <p>
              If you are under 18 years of age, reside in California, and have a registered account
              with the Website, you have the right to request removal of unwanted data that you
              publicly post on the Website. To request removal of such data, please contact us using
              the contact information provided below, and include the email address associated with
              your account and a statement that you reside in California. We will make sure the data
              is not publicly displayed on the Website, but please be aware that the data may not be
              completely or comprehensively removed from all our systems (e.g. backups, etc.).
            </p>
            <p>
              <strong>CCPA Privacy Notice</strong>
            </p>
            <p>The California Code of Regulations defines a &quot;resident&quot; as:</p>
            <ol>
              <li>
                every individual who is in the State of California for other than a temporary or
                transitory purpose and
              </li>
              <li>
                every individual who is domiciled in the State of California who is outside the
                State of California for a temporary or transitory purpose
              </li>
            </ol>
            <p>All other individuals are defined as &quot;non-residents.&quot;</p>
            <p>
              If this definition of &quot;resident&quot; applies to you, we must adhere to certain
              rights and obligations regarding your personal information.
            </p>
            <p>
              <strong>What categories of personal information do we collect?</strong>
            </p>
            <p>
              We expect to collect the following categories of personal information in the past
              twelve (12) months:
            </p>
            <br />
            <table className='tosTable'>
              <thead>
                <tr>
                  <td>
                    <strong>Category</strong>
                  </td>
                  <td>
                    <strong>Examples</strong>
                  </td>
                  <td>
                    <strong>Collected</strong>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A. Identifiers</td>
                  <td>
                    Contact details, such as name, alias, postal address, telephone or mobile
                    contact number, unique personal identifier, online identifier, Internet Protocol
                    address, email address and account name
                  </td>
                  <td>YES</td>
                </tr>
                <tr>
                  <td>B. Personal information categories</td>
                  <td>
                    Name, contact information, education, employment, employment history, languages
                    spoken, and financial information
                  </td>
                  <td>NO</td>
                </tr>
                <tr>
                  <td>C. Protected classification characteristics</td>
                  <td>Gender and date of birth</td>
                  <td>NO</td>
                </tr>
                <tr>
                  <td>D. Commercial information</td>
                  <td>
                    Transaction information, purchase history, financial details and payment
                    information
                  </td>
                  <td>YES</td>
                </tr>
                <tr>
                  <td>E. Biometric information</td>
                  <td>Fingerprints and voiceprints</td>
                  <td>NO</td>
                </tr>
                <tr>
                  <td>F. Internet or other similar network activity</td>
                  <td>
                    Browsing history, search history, online behavior, interest data, and
                    interactions with our and other websites, applications, systems and
                    advertisements
                  </td>
                  <td>NO</td>
                </tr>
                <tr>
                  <td>G. Geolocation data</td>
                  <td>Device location</td>
                  <td>NO</td>
                </tr>
                <tr>
                  <td>H. Audio, electronic, visual, thermal, olfactory, or similar information</td>
                  <td>
                    Images and audio, video or call recordings created in connection with our
                    business activities
                  </td>
                  <td>NO</td>
                </tr>
                <tr>
                  <td>I. Professional or employment-related information</td>
                  <td>
                    Business contact details in order to provide you our services at a business
                    level, job title as well as work history and professional qualifications if you
                    apply for a job with us
                  </td>
                  <td>NO</td>
                </tr>
                <tr>
                  <td>J. Education Information</td>
                  <td>Student records and directory information</td>
                  <td></td>
                </tr>
                <tr>
                  <td>K. Inferences drawn from other personal information</td>
                  <td>
                    Inferences drawn from any of the collected personal information listed above to
                    create a profile or summary about, for example, an individual’s preferences and
                    characteristics
                  </td>
                  <td>YES</td>
                </tr>
              </tbody>
            </table>

            <p>
              We may also collect other personal information outside of these categories instances
              where you interact with us in-person, online, or by phone or mail in the context of:
            </p>
            <ul>
              <li>Receiving help through our customer support channels;</li>

              <li>Participation in customer surveys or contests; and</li>

              <li>
                Facilitation in the delivery of our Services and to respond to your inquiries.
              </li>
            </ul>
            <p>
              <strong>How do we use and share your personal information?</strong>
            </p>
            <p>Giveth collects and shares your personal information through:</p>
            <ul>
              <li>Social media cookies</li>
            </ul>
            <p>
              More information about our data collection and sharing practices can be found in this
              privacy notice.
            </p>
            <p>
              You may contact us at the support channel on our discord server:
              <a
                style={tosStyle.a}
                href='https://discord.gg/TeWHtAjNQT'
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                https://discord.gg/TeWHtAjNQT
              </a>
            </p>
            <p>
              If you are using an authorized agent to exercise your right to opt-out we may deny a
              request if the authorized agent does not submit proof that they have been validly
              authorized to act on your behalf.
            </p>
            <p>
              <strong>Will your information be shared with anyone else?</strong>
            </p>
            <p>
              We may disclose your personal information with our service providers pursuant to a
              written contract between us and each service provider. Each service provider is a
              for-profit entity that processes the information on our behalf.
            </p>
            <p>
              We may use your personal information for our organizational purposes, such as for
              undertaking internal research for technological development and demonstration. This is
              not considered to be &quot;selling&quot; your personal data.
            </p>
            <p>
              <strong>Your rights with respect to your personal data</strong>
            </p>
            <p>
              <em>Right to request deletion of the data - Request to delete</em>
            </p>
            <p>
              You can ask for the deletion of your personal information that we store but we can not
              delete what it’s onchain. If you ask us to delete your personal information, we will
              respect your request and delete your personal information, subject to certain
              exceptions provided by law, such as (but not limited to) the exercise by another
              consumer of his or her right to free speech, our compliance requirements resulting
              from a legal obligation or any processing that may be required to protect against
              illegal activities.
            </p>
            <p>
              <em>Right to be informed - Request to know</em>
            </p>
            <p>Depending on the circumstances, you have a right to know:</p>
            <ul>
              <li>whether we collect and use your personal information;</li>

              <li>the categories of personal information that we collect;</li>

              <li>the purposes for which the collected personal information is used;</li>

              <li>whether we sell your personal information to third parties;</li>

              <li>
                the categories of personal information that we sold or disclosed for a business
                purpose;
              </li>

              <li>
                the categories of third parties to whom the personal information was sold or
                disclosed for a business purpose; and
              </li>

              <li>
                the business or commercial purpose for collecting or selling personal information.
              </li>
            </ul>
            <p>
              In accordance with applicable law, we are not obligated to provide or delete consumer
              information that is de-identified in response to a consumer request or to re-identify
              individual data to verify a consumer request.
            </p>
            <p>
              <em>Right to Non-Discrimination for the Exercise of a Consumer’s Privacy Rights</em>
            </p>
            <p>We will not discriminate against you if you exercise your privacy rights.</p>
            <p>
              <em>Verification process</em>
            </p>
            <p>
              Upon receiving your request, we will need to verify your identity to determine you are
              the same person about whom we have the information in our system. These verification
              efforts require us to ask you to provide information so that we can match it with
              information you have previously provided us. For instance, depending on the type of
              request you submit, we may ask you to provide certain information so that we can match
              the information you provide with the information we already have on file, or we may
              contact you through a communication method (e.g. phone or email) that you have
              previously provided to us. We may also use other verification methods as the
              circumstances dictate.
            </p>
            <p>
              We will only use personal information provided in your request to verify your identity
              or authority to make the request. To the extent possible, we will avoid requesting
              additional information from you for the purposes of verification. If, however, we
              cannot verify your identity from the information already maintained by us, we may
              request that you provide additional information for the purposes of verifying your
              identity, and for security or fraud-prevention purposes. We will delete such
              additionally provided information as soon as we finish verifying you.
            </p>
            <p>
              <em>Other privacy rights</em>
            </p>
            <ul>
              <li>you may object to the processing of your personal data</li>

              <li>
                you may request correction of your personal data if it is incorrect or no longer
                relevant, or ask to restrict the processing of the data
              </li>

              <li>
                you can designate an authorized agent to make a request under the CCPA on your
                behalf. We may deny a request from an authorized agent that does not submit proof
                that they have been validly authorized to act on your behalf in accordance with the
                CCPA.
              </li>

              <li>
                you may request to opt-out from future selling of your personal information to third
                parties. Upon receiving a request to opt-out, we will act upon the request as soon
                as feasibly possible, but no later than 15 days from the date of the request
                submission.
              </li>
            </ul>
            <p>
              To exercise these rights, you can contact us at the support channel on our discord
              server:
              <a
                style={tosStyle.a}
                href='https://discord.gg/TeWHtAjNQT'
                target='_blank'
                rel='noopener noreferrer'
              >
                https://discord.gg/TeWHtAjNQT
              </a>{' '}
              . If you have a complaint about how we handle your data, we would like to hear from
              you.
            </p>
            <h3 id='pp11'>11. DO WE MAKE UPDATES TO THIS NOTICE?</h3>
            <p>
              <strong>
                <em>
                  In Short: Yes, we will update this notice as necessary to stay compliant with
                  relevant laws.
                </em>
              </strong>
            </p>
            <p>
              We may update this privacy notice from time to time. The updated version will be
              indicated by an updated &quot;Revised&quot; date and the updated version will be
              effective as soon as it is accessible. If we make material changes to this privacy
              notice, we may notify you either by prominently posting a notice of such changes or by
              directly sending you a notification. We encourage you to review this privacy notice
              frequently to be informed of how we are protecting your information.
            </p>
            <h3 id='pp12'>12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h3>
            <p>
              If you have questions or comments about this notice, you may reach us at the support
              channel on our discord server:
              <a
                style={tosStyle.a}
                href='https://discord.gg/TeWHtAjNQT'
                target='_blank'
                rel='noopener noreferrer'
              >
                {' '}
                https://discord.gg/TeWHtAjNQT
              </a>
            </p>
            <h3 id='pp13'>
              13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
            </h3>
            <p>
              Based on the applicable laws of your country, you may have the right to request access
              to the personal information we collect from you, change that information, or delete it
              in some circumstances. To request to review, update, or delete your personal
              information, please reach us at the support channel on our discord server:
              <a
                style={tosStyle.a}
                href='https://discord.gg/TeWHtAjNQT'
                target='_blank'
                rel='noopener noreferrer'
              >
                https://discord.gg/TeWHtAjNQT
              </a>
            </p>
          </section>
        </Container>
      </Main>
    </Layout>
  )
}

const Main = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  text-align: justify;
`

const Container = styled(Box)`
  max-width: 80vh;
  justify-self: center;
`

export default Tos
