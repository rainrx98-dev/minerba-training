import { getPersonaById, buildPersonaInstructions } from './personas';
import { getFrameworkById } from './frameworks';

export interface QuizScenario {
  opener: string;
  contextSummary: string;
  frameworks: string[];
  /** What a SOLID first response must include — used by the evaluator to grade. */
  evaluationCriteria: string;
  /** The single most common mistake trainees make on this case. */
  commonMistake: string;
}

export const quizScenarios: Record<string, QuizScenario> = {
  '01': {
    opener: `It's March 24, 1989. 12:04 AM. The Exxon Valdez has just run aground on Bligh Reef in Prince William Sound, Alaska. Approximately 10.9 million gallons of crude oil are pouring into pristine Alaskan waters. Television crews are already being chartered to fly to the site.

You are Minerba's lead crisis communications consultant, retained by Exxon's communications team. They have reached you by emergency phone. CEO Lawrence Rawl has not yet been publicly notified. There is no tested crisis plan. Response equipment is not pre-positioned.

**What is your first piece of advice to the team?**`,
    contextSummary:
      'Exxon Valdez Oil Spill (1989) — The tanker grounded on Bligh Reef in Alaska. No crisis plan. CEO absent. 10-day silence became a textbook failure.',
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) recommend notifying CEO Rawl immediately and getting him physically to Alaska, not keeping him away; (2) establish a single spokesperson — not multiple voices; (3) issue an acknowledgment statement within 2 hours even without full information; (4) NOT recommend waiting for full facts before communicating. Silence is not an option.',
    commonMistake: 'Recommending Exxon "gather full facts before speaking" — this is exactly what caused the 10-day silence that destroyed Exxon\'s reputation. The first move must be acknowledgment + accountability, not information-gathering.',
  },
  '02': {
    opener: `It's April 30, 1995. Greenpeace has just announced it is occupying the Brent Spar oil platform in the North Sea. Shell plans to sink it at sea — a decision backed by three years of environmental science and UK government approval.

Greenpeace claims the platform contains "5,500 tonnes of oil and 130 tonnes of highly toxic radioactive substances." The number is almost certainly false, but it's already on the wires.

You are Minerba's lead consultant retained by Shell's communications team. German consumer boycotts of Shell petrol stations have just begun trending on early media monitoring.

**Shell has the science on its side. What is your communications strategy?**`,
    contextSummary:
      'Brent Spar (1995) — Shell was scientifically correct about deep-sea disposal, but Greenpeace won the public battle through visual media and false data.',
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) recognize that being scientifically right is not sufficient — the visual of a platform sinking is more powerful than any data; (2) propose a rapid, public counter-narrative with independent verification of Shell\'s science; (3) recommend direct engagement with Greenpeace rather than dismissal; (4) acknowledge the public\'s emotional reaction to ocean dumping even if the science supports it.',
    commonMistake: 'Doubling down on "we have the science" without addressing the visual/emotional dimension. In crisis communications, scientific correctness loses to compelling imagery every time. Shell\'s failure was treating this as a technical problem when it was a perception problem.',
  },
  '03': {
    opener: `It's October 16, 2001. Enron has just reported a $618 million third-quarter loss and disclosed that the SEC has opened an informal inquiry. The stock is down 20% today alone.

Sherron Watkins warned CEO Kenneth Lay in August that the company would "implode in a wave of accounting scandals." That memo is now circulating inside the building.

You are Minerba's lead crisis communications consultant, hired by Enron's board — not by management. The board wants to understand: how bad is this, and what should they say publicly?

**What do you tell the board?**`,
    contextSummary:
      'Enron Collapse (2001) — Systematic accounting fraud. Whistleblower suppressed. CEO contemptuous of journalists. The largest US bankruptcy at the time.',
    frameworks: ['anti-corruption-checklist'],
    evaluationCriteria: 'A solid answer to the board must: (1) tell the board this is existential — not a manageable PR problem; (2) recommend the board commission an independent investigation SEPARATE from management; (3) advise that the Watkins memo being in circulation makes suppression impossible; (4) recommend full cooperation with the SEC, not minimization. The board must be told the truth about severity even if management is not telling it to them.',
    commonMistake: 'Treating this as a messaging problem — recommending the board "get ahead of the narrative" without first finding out what is actually true. When fraud is possible, communications strategy is secondary to establishing facts and independent accountability.',
  },
  '04': {
    opener: `It's April 20, 2010. 10:00 PM. The Deepwater Horizon drilling rig has just exploded 50 miles off the Louisiana coast. Eleven workers are missing and presumed dead. The wellhead 1,500 meters below the Gulf of Mexico is uncontrolled.

CNN is preparing a live underwater camera feed. By morning, millions of people will be able to watch the oil gusher in real time, 24 hours a day.

You are Minerba's lead crisis communications consultant retained by BP. CEO Tony Hayward wants to make a statement tonight. He has drafted: *"The Gulf of Mexico is a very big ocean. The amount of oil we are putting into it is tiny in relation to the total water volume."*

**Do you approve this statement? And what is your overall communications strategy for the next 72 hours?**`,
    contextSummary:
      "BP Deepwater Horizon (2010) — 11 deaths. 4.9M barrels spilled. CEO Hayward's 'I'd like my life back' statement became the decade's most cited crisis communications failure.",
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) REJECT Hayward\'s draft statement immediately and explain why — it minimizes 11 deaths and is factually dismissive; (2) lead with the human toll (11 workers dead/missing) before any environmental or operational framing; (3) recognize that a 24/7 live camera feed of the gushing well changes everything — BP cannot control the visual; (4) recommend Hayward go to Louisiana immediately, not stay in London; (5) establish independent environmental monitoring from day one.',
    commonMistake: 'Approving or softening (rather than rejecting) the "tiny in relation to total water volume" statement. This is the single most famous crisis communications failure of the decade. Any answer that does not immediately and unambiguously reject this statement is a failing grade.',
  },
  '05': {
    opener: `It's January 9, 2004. Shell has just been forced to restate its proved oil reserves — reducing them by 3.9 billion barrels (20%). This is the largest reserves restatement in industry history.

An internal email from the head of exploration has just been leaked to the Financial Times. It reads: *"I am becoming sick and tired about lying about the extent of our reserves issues."*

Shell's communications team has come to you. They are considering releasing additional restatements in tranches over the next several months to "manage" the impact.

**What is your advice on the disclosure strategy?**`,
    contextSummary:
      "Shell Reserves (2004) — Management-driven inflation of reserves. Internal 'sick and tired of lying' email destroyed credibility. Serial restatements made it worse.",
    frameworks: ['anti-corruption-checklist'],
    evaluationCriteria: 'A solid answer must: (1) REJECT the tranching strategy — releasing bad news in installments is the worst possible approach because it implies ongoing concealment; (2) recommend a single, complete, simultaneous disclosure of all known restatements; (3) address the leaked email directly — it cannot be ignored and makes the disclosure crisis existential; (4) recommend independent forensic accounting before making any public statement. Full disclosure once is survivable; serial revelations are not.',
    commonMistake: 'Agreeing with the "tranching" disclosure strategy. This is precisely what Shell did — and precisely why the crisis lasted months instead of weeks. Managing a disclosure in installments signals that you are still hiding things.',
  },
  '06': {
    opener: `It's November 10, 1995. Ken Saro-Wiwa and eight other MOSOP leaders have just been executed by the Nigerian military government. The executions happened today — the same week as Shell's annual general meeting.

Shell's operations in Ogoniland have been at the center of a human rights crisis for years. The company's official position has been: "We do not interfere in the judicial processes of sovereign nations."

International media are now asking Shell for a comment on the executions. Shell's European consumer operations are reporting that journalists are camped outside major petrol stations.

**What does Shell say in the next two hours? And what should they have been doing for the past two years?**`,
    contextSummary:
      "Shell Nigeria (1995) — Saro-Wiwa executed while Shell maintained 'non-interference.' Silence was read as complicity. A $15.5M settlement came 14 years later.",
    frameworks: ['fpic-checklist'],
    evaluationCriteria: 'A solid answer must: (1) recognize that "non-interference in sovereign judicial processes" is no longer tenable the moment executions occur during your AGM week; (2) recommend Shell issue an immediate statement expressing clear moral concern — not neutrality — over the executions; (3) acknowledge the two-year failure to use Shell\'s leverage with the Nigerian government as a preventable error; (4) NOT recommend staying silent because "we have no comment on sovereign judicial matters." Silence is complicity in this moment.',
    commonMistake: 'Recommending Shell maintain "diplomatic neutrality" or "non-interference." Neutrality in the face of state-sanctioned executions of community leaders connected to your operations is read by every stakeholder as complicity. Shell\'s exact failure was this neutral stance.',
  },
  '07': {
    opener: `It's March 17, 2014. Brazilian Federal Police have just arrested Paulo Roberto Costa — Petrobras's former Director of Downstream Operations — on money laundering charges. The warrant references a "scheme of payments" involving Petrobras contracts.

This is the first arrest in what will become Operation Car Wash. Petrobras is majority state-owned. President Dilma Rousseff chaired the board during part of the period in question.

You are Minerba's lead consultant retained by Petrobras's board. The company's legal team wants to immediately issue a statement denying involvement and positioning Petrobras as a victim of the contractors.

**Do you approve this strategy? What do you recommend?**`,
    contextSummary:
      'Petrobras Lava Jato (2014–2019) — $2.1B bribery scheme. State ownership merged corporate and political crises. Partial recovery through genuine governance reform makes this the only "mixed" case.',
    frameworks: ['anti-corruption-checklist', '72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) reject the "victim of contractors" framing — it will be demolished when internal documents surface and makes the company look dishonest; (2) recommend that Petrobras COOPERATE fully with investigators, not fight; (3) address the Dilma Rousseff board connection directly — pretending political exposure does not exist is not credible; (4) recommend the board immediately commission an independent internal investigation with external legal counsel. The partial recovery Petrobras eventually achieved came entirely from genuine governance reform, not from the defensive communications strategy the legal team initially recommended.',
    commonMistake: 'Approving the "victim of contractors" strategy. While technically defensible as a legal posture, as a communications strategy it backfired catastrophically when internal documents proved executive-level knowledge of the scheme.',
  },
  L1: {
    opener: `It's 2001. Chevron has just completed its acquisition of Texaco, inheriting all of Texaco's assets — including a class-action lawsuit filed in New York by 30,000 Ecuadorian plaintiffs from the Amazon region.

Texaco operated in Ecuador from 1964 to 1992. The contamination left behind — open waste pits, oil spills, toxic water — is extensive. Cancer rates in the affected communities are 150% above the national average.

The legal team's advice: fight the lawsuit aggressively on jurisdictional grounds and have it moved to Ecuador. Chevron's communications team has come to you.

**What is your communications strategy for inheriting this liability? And what warning would you give Chevron's board about the "move it to Ecuador" legal strategy?**`,
    contextSummary:
      'Chevron/Texaco Ecuador (1964–2018) — 30,000 plaintiffs. $9.5B judgment (unenforceable). Chevron won every legal battle but remains globally associated with Amazon contamination.',
    frameworks: ['fpic-checklist', '72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) warn the board that winning legal battles while losing the public narrative is a real and costly outcome — Chevron did exactly this; (2) distinguish between legal liability (inherited) and reputational responsibility (also inherited); (3) recommend proactive community engagement in Ecuador before the lawsuit forces it; (4) warn that "move it to Ecuador" strategy backfires if Ecuadorian courts then rule against you — you lose jurisdiction and credibility simultaneously.',
    commonMistake: 'Treating this as purely a legal problem. Chevron won every legal battle over 18 years and is still globally associated with Amazon contamination. The communications strategy of aggressive legal warfare without any community accountability destroyed social license across Latin America.',
  },
  L2: {
    opener: `It's December 21, 2016. Odebrecht has just entered a guilty plea with the US Department of Justice, admitting to paying $788 million in bribes across 12 countries over 15 years.

The plea agreement names specific officials, political parties, and amounts in Brazil, Peru, Colombia, Ecuador, Venezuela, Argentina, and six other countries. It is filed in US federal court — publicly accessible immediately.

Your firm operates energy infrastructure in three of the named countries through a joint venture with Odebrecht as the construction contractor. Your company is not named in the plea — but your contracts are referenced.

You have approximately four hours before journalists start calling.

**What do you do in the next four hours?**`,
    contextSummary:
      'Lava Jato Regional (2014–2019) — Odebrecht bribery in 12 countries. 10 heads of state implicated. No coordinated regional communications response existed.',
    frameworks: ['anti-corruption-checklist'],
    evaluationCriteria: 'A solid answer in four hours must: (1) brief your own legal counsel immediately — not after you call the press; (2) notify your board before any public communication; (3) issue a proactive statement in each named country acknowledging your awareness of the plea, your own uninvolved status, and your commitment to cooperate — BEFORE journalists call; (4) NOT wait for journalists to frame the story. Four hours of silence will be interpreted as guilt-by-association.',
    commonMistake: 'Waiting to respond until journalists call. You have four hours of advance warning — a luxury most crisis subjects do not have. Not using that window to proactively shape the narrative is the defining communications error of every company caught in Lava Jato\'s peripheral exposure.',
  },
  L3: {
    opener: `It's November 2020. Vitol — one of the world's largest independent oil trading companies — has just reached a $135 million settlement with the US Department of Justice over bribery payments to PetroEcuador officials.

The DOJ press release describes a pattern of systematic corruption across the trading industry. It also references ongoing investigations into Trafigura and Gunvor for similar conduct.

Vitol's CEO has come to you. The company has issued a single, brief legal statement. He asks: "Is this enough? Can we close this chapter now?"

**What do you tell him? And what would a genuinely credible response to this crisis require?**`,
    contextSummary:
      'PetroEcuador Bribery (2015–2024) — Vitol, Trafigura, Gunvor all implicated. First individual trader convicted (2024). The "deny, settle, rebrand" playbook no longer works.',
    frameworks: ['anti-corruption-checklist'],
    evaluationCriteria: 'A solid answer must: (1) tell the CEO "no, a brief legal statement is not enough" — it signals the company considers this closed when regulators and the public do not; (2) explain that the DOJ press release referencing ongoing investigations into Trafigura and Gunvor means this industry chapter is not over; (3) recommend a substantive statement that acknowledges the conduct, names what failed internally, and commits to specific governance changes; (4) warn that "deny, settle, rebrand" only works once — and Vitol has now used it.',
    commonMistake: 'Advising the CEO that the legal statement is sufficient and the chapter can now be closed. The question explicitly tells you other companies are under investigation — this is an industry-wide story, and Vitol\'s response will define whether it is seen as a leader in reform or a company that got caught.',
  },

  // ─── Mining Cases ─────────────────────────────────────────────────────────
  M1: {
    opener: `It's 12:45 PM on January 25, 2019. Vale's Córrego do Feijão tailings dam has just collapsed near Brumadinho, Minas Gerais, Brazil. A wall of toxic mining waste has engulfed Vale's own administrative buildings and worker canteens. Over 200 employees and community members are confirmed or presumed dead — including workers who were eating lunch directly below the dam.

CNN Brasil has a helicopter en route. International wire services are picking up the story. In 2015, Vale's Samarco joint venture suffered the Mariana dam collapse, killing 19 people. CEO Fabio Schvartsman publicly promised "there can be no more Samarcos."

Schvartsman's communications director has you on the phone. The CEO wants to make a statement in 30 minutes. His draft begins: "The dam was certified stable by TÜV SÜD just seven months ago…"

**Do you approve that opening? What does Vale's first statement need to say — and what does it absolutely cannot say?**`,
    contextSummary:
      'Vale Brumadinho (2019) — 270 dead. CEO blamed German inspectors. His prior "no more Samarcos" promise destroyed every defense. The largest disaster death toll in Brazilian industrial history.',
    frameworks: ['72-hour-protocol', 'fpic-checklist'],
    evaluationCriteria: 'A solid answer must: (1) REJECT the TÜV SÜD opening — leading with certification blame is legally self-protective but humanly catastrophic; (2) the first statement must lead with the human loss, not the certification; (3) explicitly address Schvartsman\'s "no more Samarcos" promise — it must be acknowledged, not ignored; (4) recommend Schvartsman go to Brumadinho immediately. Any answer that approves or softens the TÜV SÜD opening is a fail.',
    commonMistake: 'Approving the "certified stable" opening because it is factually accurate. It is accurate — and it is exactly what destroyed Schvartsman\'s credibility. Leading with legal defense when 200+ people are dead reads as corporate self-protection over human acknowledgment.',
  },

  M2: {
    opener: `It's the morning of November 6, 2015. Yesterday, the Fundão tailings dam at the Samarco iron ore complex — a 50/50 joint venture between BHP Billiton and Vale — collapsed near Mariana, Minas Gerais. At least 12 people are confirmed dead; seven more are missing. A wave of toxic mine tailings has entered the Rio Gualaxo do Norte and is moving toward the Rio Doce — a river system that serves millions of Brazilians.

BHP's communications team is in Melbourne. Vale's is in Rio. Samarco's is in Belo Horizonte. All three have issued separate press statements. BHP's statement leads with insurance coverage and reassurance to investors. Vale's focuses on its status as a partial owner. Samarco's describes a "mud flow."

Brazilian federal environmental authorities are holding a press conference in two hours. The governor of Minas Gerais is expected to announce an investigation.

**You are Minerba's consultant, retained jointly by BHP and Vale. They are asking you for an integrated communications strategy. What do you recommend — and what do you tell them about the "mud flow" framing?**`,
    contextSummary:
      'Samarco/Mariana (2015) — 19 dead. BHP and Vale issued contradictory statements. "Mud flow" framing was immediately discredited. The Renova Foundation became its own PR crisis. A $30B settlement came nine years later.',
    frameworks: ['72-hour-protocol', 'fpic-checklist'],
    evaluationCriteria: 'A solid answer must: (1) insist on a SINGLE unified statement from all three entities — separate statements are not acceptable; (2) REJECT the "mud flow" framing immediately and explain why — tailings waste is toxic, not mud, and the framing will be demolished by any environmental scientist; (3) address the jurisdictional problem (three PR teams in three cities) with a single crisis lead; (4) recommend the two-hour window before the government press conference be used for coordination, not three separate drafts.',
    commonMistake: 'Allowing the "mud flow" framing to stand because it sounds less alarming. This was the defining communications failure of Samarco — the framing was contradicted by basic chemistry and destroyed credibility on day one.',
  },

  M3: {
    opener: `It's May 26, 2020 — two days after Rio Tinto blasted two ancient rock shelters at Juukan Gorge in Western Australia, destroying 46,000-year-old sacred sites belonging to the Puutu Kunti Kurrama and Pinikura peoples. The blast was legally authorized under a 2013 government consent. But Rio Tinto's own archaeologists documented the full significance of the sites in 2018–2019 — after the consent was granted — and the PKKP community had explicitly opposed the destruction in writing weeks before it occurred.

Rio Tinto's initial statement expressed "regret" and noted the legal authorization. It has been demolished in every media outlet that has covered it. The PKKP have released a public statement saying they were "devastated" and had not been heard.

Three major institutional shareholders — Aberdeen Standard, Australian Super, and Legal & General — are emailing your contact at Rio Tinto demanding a call. Australian media is running the story on every front page.

**Rio Tinto's communications director wants your advice on what the CEO should say today. The CEO's instinct is to explain the legal authorization process. What do you recommend instead?**`,
    contextSummary:
      'Rio Tinto Juukan Gorge (2020) — 46,000-year-old sacred sites destroyed with legal authorization. CEO and two executives resigned under shareholder pressure. Parliamentary inquiry titled "Never Again."',
    frameworks: ['fpic-checklist'],
    evaluationCriteria: 'A solid answer must: (1) tell the CEO NOT to explain the legal authorization process — it is irrelevant to the moral failure; (2) the statement must acknowledge that Rio Tinto knew the full significance of the sites before the blast and proceeded anyway; (3) recommend direct, in-person engagement with the PKKP community before any further public statement; (4) address the shareholder emails as an urgent governance issue, not a PR problem. Legal authorization does not equal moral authorization — this distinction is the entire lesson of this case.',
    commonMistake: 'Advising the CEO to explain the legal authorization process. This is exactly what Rio Tinto did, and it was demolished immediately. "We had the legal right" is the least empathetic possible response to the destruction of 46,000-year-old sacred sites.',
  },

  M4: {
    opener: `It's September 2015. Word has reached Barrick Gold's communications team that a valve failure at the Veladero mine in San Juan, Argentina, released cyanide-laced process solution into local river systems. Local communities found out via employee WhatsApp messages two days ago — before the company made any official statement.

Barrick has not yet issued a public statement. Provincial authorities are demanding information. Local media in San Juan are running photos shared on social media showing orange-tinged water. Community organizations are calling for mine suspension.

The mine's general manager is proposing a statement that calls community concerns about contamination "unfounded controversy."

**You are Minerba's consultant. You have one hour before the company must respond. What do you say — and what do you absolutely refuse to approve?**`,
    contextSummary:
      'Barrick Veladero (2015–2017) — Three separate cyanide incidents. Communities learned via WhatsApp. Six-day disclosure delay on the first spill. A fired whistleblower surfaced. "Unfounded controversy" framing became infamous.',
    frameworks: ['72-hour-protocol', 'fpic-checklist'],
    evaluationCriteria: 'A solid answer must: (1) REFUSE to approve "unfounded controversy" — the community already knows via WhatsApp; calling it unfounded is a lie they can disprove with their phones; (2) recommend immediate direct notification to community leaders before any media statement; (3) acknowledge the contamination, state what is known and what is being tested; (4) recommend Barrick commission independent water testing, not company testing. The communities found out before the company disclosed — this is the crisis.',
    commonMistake: 'Approving or softening "unfounded controversy." The community already has photos of orange water on WhatsApp. Calling their documented reality "unfounded" is not a communications strategy — it is a lie that makes the eventual accountability worse.',
  },

  M5: {
    opener: `It's 2003. Doe Run Peru has now been operating the La Oroya smelter in the Peruvian Andes for six years, since acquiring it from state-owned Centromin Peru in 1997. The company has already received two extensions on its Environmental Adequacy and Management Program (PAMA) commitments — the environmental standards it agreed to meet as a condition of the acquisition.

A study by the Blacksmith Institute has just classified La Oroya as one of the ten most polluted places on Earth. A Peruvian health ministry report has found that 99% of children tested in La Oroya have blood lead levels above WHO safe limits. Average levels are more than three times the safe threshold.

The study is being picked up by international wire services. Doe Run Peru's parent company, Renco Group — owned by billionaire Ira Rennert — has no public statement.

Renco Group has called Minerba. They want to know: how do we respond to the health study?

**What is your advice — and what warning do you give Renco about the "jobs vs. health" communications framing their local team is recommending?**`,
    contextSummary:
      'Doe Run Peru / La Oroya (1997–2009) — 99% of children with toxic blood lead levels. Serial PAMA extensions. Bankruptcy filing in 2009 seen as abandonment. Inter-American Commission issued emergency health measures. March 2024 landmark court ruling.',
    frameworks: ['fpic-checklist', 'anti-corruption-checklist'],
    evaluationCriteria: 'A solid answer must: (1) reject the "jobs vs. health" framing as a false choice that forces the company into an indefensible position — no communications strategy survives "we chose jobs over children\'s blood lead levels"; (2) recommend acknowledging the health data rather than disputing it — 99% of tested children cannot be argued away; (3) advise that the PAMA extension history makes any "we take health seriously" messaging non-credible without concrete remediation commitments; (4) warn Renco that a US-based billionaire owner of a Peruvian smelter poisoning children is the worst possible optics in any media market.',
    commonMistake: 'Recommending the "jobs vs. health" framing because it has local community support. This framing works locally for a short time and then collapses nationally and internationally. When 99% of children have toxic blood lead levels, any strategy that puts economic arguments first will eventually be used as evidence of knowing indifference.',
  },

  // ─── Healthcare Cases ──────────────────────────────────────────────────────
  H1: {
    opener: `It's September 30, 1982. Three people have died in the Chicago area after taking Extra-Strength Tylenol capsules. The FBI has confirmed that someone removed bottles from store shelves, laced capsules with potassium cyanide, and returned them. Your production plants are clean. Johnson & Johnson bears no legal responsibility.

FBI advisors are recommending a regional recall — Chicago only — arguing a national recall will cause unnecessary panic and might encourage copycat crimes. Your legal team agrees: you have no liability, and a national recall is not required.

But you are aware of three things: First, you cannot be certain all tampered bottles are in Chicago. Second, cameras are outside every major pharmacy in America already. Third, J&J's Credo, written in 1943, states that responsibility to customers and communities comes before responsibility to stockholders.

CEO James Burke has asked you for your recommendation. The press conference is in 90 minutes.

**Do you recommend a national recall or a regional one? Walk through your reasoning — and what does Burke say at the press conference?**`,
    contextSummary:
      "J&J Tylenol (1982) — 7 deaths. CEO Burke recalled 31 million bottles ($100M) against FBI advice. Tylenol recovered to 30%+ market share within one year. The gold standard of crisis communications. Burke received the Presidential Medal of Freedom in 2000.",
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) recommend the NATIONAL recall, not the regional one, despite no legal requirement; (2) explicitly invoke the Credo — this is a Credo-versus-FBI-advice decision; (3) explain WHY national: because uncertainty about tampered bottle locations makes regional containment insufficient, and because the reputational cost of a second death outside Chicago is existential; (4) Burke\'s press conference must open with the human cost, not the recall logistics. The legal case for NOT recalling is strong — a solid answer recommends the recall anyway and explains the reasoning.',
    commonMistake: 'Recommending the regional recall because "J&J has no liability and the FBI recommends containment." This is the most-taught wrong answer in business school. The Credo explicitly subordinates profit and legal exposure to consumer safety — a student who recommends the cheaper, legally defensible regional option is missing the entire lesson.',
  },

  H2: {
    opener: `It's early 2007. Purdue Pharma is about to enter a guilty plea with the US Department of Justice — the company and three senior executives will plead guilty to federal charges related to misbranding OxyContin, admitting the company misled regulators, doctors, and patients about the drug's addiction risk. The fine will be $635 million.

Purdue's communications team is preparing the post-plea strategy. The current draft statement leads with: "We believe this resolution allows us to move forward and continue our mission of providing relief to patients suffering from pain."

In the newsroom, journalists have already obtained internal Purdue documents — training materials for the salesforce, internal memos acknowledging abuse patterns as far back as 1999. These documents will be published alongside the guilty plea story.

You are Minerba's consultant, retained by a board member who is concerned that the current communications strategy does not go far enough.

**What is your assessment of the "move forward" framing — and what would a more credible response require? What do you tell the board member about the internal document problem?**`,
    contextSummary:
      'Purdue Pharma / OxyContin (1995–2025) — 2007: $635M fine. 2019: bankruptcy. 2020: second guilty plea. Sackler family withdrew $11B ahead of settlement. ~900,000 US opioid deaths since 1999. $7.4B settlement (2025), no admission of wrongdoing.',
    frameworks: ['72-hour-protocol', 'anti-corruption-checklist'],
    evaluationCriteria: 'A solid answer must: (1) identify that "move forward" framing is dangerously incomplete when internal "dodge ball" sales training documents are about to be published — the plea is not the story, the cover-up is; (2) recommend Gilmartin acknowledge the internal document problem before journalists frame it; (3) advise that a guilty plea with a "move forward" frame reads as "we got caught and want credit for settling"; (4) recommend genuine acknowledgment of harm to patients — not just to "the company\'s mission." The board member hired you precisely because the current strategy does not go far enough.',
    commonMistake: 'Approving the "voluntary withdrawal + patient safety + move forward" framing because the plea is technically complete. The problem is the five preceding years of "dodge ball" sales training — the plea statement must address the conduct, not just announce the resolution.',
  },

  H3: {
    opener: `It's March 11, 2021. Denmark has just announced the suspension of AstraZeneca's COVID-19 vaccine, citing reports of rare blood clotting events. Norway and Iceland have followed within hours.

Your phone is ringing with calls from health ministries across Europe. Germany, France, Italy, Spain, and the Netherlands are all weighing independent suspension decisions. The EMA has announced it will complete a safety review in one week.

AstraZeneca's communications team has issued a statement noting the company is "confident in the safety of our vaccine." The UK has not suspended. WHO has not suspended. The EMA has not suspended.

Meanwhile, a major German tabloid's front page reads: "VACCINE KILLS?" Your estimated risk of the blood clotting event: approximately 1 in 200,000 doses. Your estimated risk of severe COVID-19 without vaccination in the current European wave: substantially higher.

**You are Minerba's consultant retained by AstraZeneca. Seven more European health ministries are making suspension decisions in the next 24 hours. What is your communications strategy — and how do you present the 1-in-200,000 risk to a public that is already anxious?**`,
    contextSummary:
      'AstraZeneca COVID Vaccine (2021) — 11+ European countries suspended independently in 4 days. EMA ultimately found benefits outweigh risks. Fragmented multi-country messaging — not the safety signal itself — is the core PR failure. Vaccine hesitancy consequences extended to COVAX countries.',
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) identify the REAL crisis — not the safety signal, but the fragmented national response creating more fear than the data warrants; (2) recommend AstraZeneca proactively engage every health ministry individually with the same data package BEFORE they make independent decisions; (3) address the 1-in-200,000 risk with absolute frequency framing AND comparison to COVID risk — not just relative risk alone; (4) recognize that "confident in the safety of our vaccine" as a blanket statement is being destroyed by independent government actions in real time. The communications failure here is coordination, not candor.',
    commonMistake: 'Recommending AstraZeneca simply "get the data out" without addressing the coordination failure. Each country acting independently created more damage than the clotting risk itself — the strategy must focus on preventing the next independent national suspension, not just correcting the current narrative.',
  },

  // ─── New Energy Cases ──────────────────────────────────────────────────────
  '08': {
    opener: `It's March 23, 2005. A massive explosion has just ripped through the isomerization unit at BP's Texas City refinery — the largest oil refinery in the United States. Fifteen contract workers are confirmed dead, all of them inside or near a temporary office trailer positioned too close to the unit. At least 180 more are injured.

The BP communications team has reached you. CEO Lord John Browne is in London and has not yet spoken publicly. The company's initial instinct is to express condolences and announce an investigation.

You know two things that the public does not yet know: (1) BP conducted a major safety audit of Texas City in 2004 that found "significant safety and infrastructure risks" — and those recommendations were not fully implemented; (2) BP's own internal safety culture report from 2004 warned of "serious risk of a major site incident."

**Do you recommend that BP disclose the 2004 safety audit findings proactively — and why? What should Browne say, and what should he not say, in the next two hours?**`,
    contextSummary:
      'BP Texas City (2005) — 15 killed in refinery explosion. CEO Browne stayed in London. The Baker Panel (2007) found systemic safety culture failure. A direct precursor to Deepwater Horizon five years later.',
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) recommend proactive disclosure of the 2004 safety audit — because it will come out anyway and voluntary disclosure is infinitely better than discovery; (2) require Browne to travel to Texas immediately — staying in London is not acceptable when 15 workers are dead; (3) NOT open with condolences followed by investigation announcement — acknowledge the audit warnings directly; (4) recognize that a company that knew about "significant safety risks" and did not act faces a different standard than one blindsided by an accident.',
    commonMistake: 'Recommending Browne stay in London and manage from a distance because "the situation is under control operationally." CEO physical presence at a fatal industrial accident is non-negotiable — remote management reads as indifference. Browne\'s absence was the defining image failure of this crisis.',
  },

  '09': {
    opener: `It's November 8, 2018. PG&E's electrical transmission lines have just ignited a fast-moving wildfire in Butte County, California. The town of Paradise — population 26,000 — is being engulfed. At least 85 people will die, making this the deadliest wildfire in California history.

You are Minerba's consultant, called urgently by a PG&E board member. The company's communications team wants to lead with a statement focused on operational updates and safety precautions.

You are aware of the following: (1) PG&E received warnings about the Caribou-Palermo transmission line — the line investigators will later identify as the cause — as far back as 2012; (2) PG&E filed for bankruptcy protection over wildfire liability just two months ago (January 2019 would mark the filing date — this fire will accelerate it); (3) Families are right now calling hospitals, shelters, and emergency lines searching for missing relatives.

**What does PG&E's first statement say? How do you advise the CEO to speak publicly when families are still searching for the missing? And what is the communications strategy for the bankruptcy filing that is now almost certainly coming?**`,
    contextSummary:
      'PG&E California Wildfires (2018-2019) — 85 dead, Paradise destroyed. PG&E filed Chapter 11 bankruptcy — the first US utility to do so over climate wildfire liability. CEO Williams resigned under pressure. 84 counts of involuntary manslaughter conviction in 2020.',
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) reject "operational updates and safety precautions" as the opening frame — people are missing and dying; the first statement is about the human loss, full stop; (2) address families searching for missing relatives — PG&E must activate a family emergency line and communicate that publicly within hours; (3) not mention the Caribou-Palermo warning history proactively in the first 24 hours — but must not say anything that contradicts it; (4) address the bankruptcy reality directly — pretending financial exposure does not exist is not a communications strategy.',
    commonMistake: 'Opening with operational and safety information while families are still searching for the missing. This is the most common error in industrial disaster communications — the operational update frame is appropriate for employees and regulators, not for the public in hour one of a mass casualty event.',
  },

  '10': {
    opener: `It's May 7, 2021. Colonial Pipeline's IT systems have been hit by a ransomware attack from a group called DarkSide. You are Minerba's crisis communications consultant, retained by Colonial's board.

Here is what you know in the first two hours: The operational technology (OT) systems that run the pipeline are not directly compromised — but the company cannot confirm this with certainty. CEO Joseph Blount is considering proactively shutting down the 5,500-mile pipeline as a precaution. That pipeline supplies 45% of the East Coast's fuel.

The FBI and CISA have been notified. Blount is also considering paying the ransom — approximately $4.4 million in Bitcoin — to recover the decryption key quickly. He wants to do this quietly, without public disclosure.

**Your advice is needed on three decisions: (1) Communicate the attack publicly now, or wait? (2) Shut down the pipeline proactively? (3) Pay the ransom — and if so, do you disclose this? What are the communications consequences of each choice?**`,
    contextSummary:
      'Colonial Pipeline Ransomware (2021) — DarkSide attack. CEO paid $4.4M ransom without notifying FBI. Proactive pipeline shutdown caused East Coast fuel shortages. DOJ recovered $2.3M of the Bitcoin. A landmark case in critical infrastructure cyber-crisis communications.',
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must address all three decisions: (1) Communicate publicly — yes, immediately; critical infrastructure attacks affecting fuel supply cannot be managed silently; (2) Shut down proactively — yes, because the OT uncertainty makes a potential mid-operation failure worse than a controlled shutdown; (3) Ransom — advise AGAINST paying without FBI notification; paying without disclosure violates OFAC guidance and creates legal exposure worse than the operational problem. The communications consequence of each wrong choice must be articulated, not just the operational one.',
    commonMistake: 'Recommending the ransom be paid "quietly" to restore operations faster. Paying without FBI notification is an OFAC compliance issue, and the "quiet" payment becoming public (as it did) creates a secondary crisis worse than the original attack.',
  },

  '11': {
    opener: `It's late afternoon on January 18, 2019. A ruptured PEMEX gasoline pipeline near Tlahuelilpan, Hidalgo, Mexico is gushing fuel into a drainage ditch. Word has spread through the surrounding community. Hundreds of local people — families, children — are gathered around the rupture collecting free fuel in containers.

PEMEX and the Mexican Army knew about the tap. Military personnel were present. No one cleared the area.

Then the pipeline ignites.

The images are horrific: people engulfed in flames. At least 137 will die. PEMEX's local team is already drafting a statement that frames the event as "illegal tapping by community members."

You are Minerba's consultant. You have the CEO of PEMEX on the phone. The "illegal tapping" narrative is technically accurate — but it is already being posted as a WhatsApp video in every community near every PEMEX pipeline in Mexico.

**Do you approve the "illegal tapping" framing? What does PEMEX's first statement actually need to say — and what is the communications strategy for a state-owned company in a country where the new president staked his campaign on ending fuel theft?**`,
    contextSummary:
      'PEMEX Tlahuelilpan (2019) — 137 killed when tapped pipeline ignited. Military was present but did not clear the area. "Illegal tapping" framing shifted blame but deepened community rage. A defining case for state-owned energy company crisis communications in Latin America.',
    frameworks: ['72-hour-protocol', 'fpic-checklist'],
    evaluationCriteria: 'A solid answer must: (1) reject the "illegal tapping" opening — it is technically accurate and morally catastrophic when military personnel were present and did not clear the area; (2) PEMEX must acknowledge that personnel were at the scene and take responsibility for the failure to prevent the gathering; (3) address the president\'s political context — this must be acknowledged, not ignored; (4) the first statement must not assign blame to victims when your own personnel were present and failed to act. The question is not whether the tapping was illegal — it is why the military present did not clear the crowd.',
    commonMistake: 'Approving "illegal tapping" because it is legally accurate. 137 people died in a fire while military personnel were present and did not clear the area. Any statement that opens with victim blame before acknowledging institutional failure will be destroyed in the next news cycle.',
  },

  '12': {
    opener: `It's August 10, 2016. Energy Transfer Partners' Dakota Access Pipeline construction crews have just bulldozed land that the Standing Rock Sioux Tribe considers sacred — including burial sites — on land the tribe argues was never properly consulted. Protesters have been pepper-sprayed and attacked by private security dogs. Video has gone viral.

The hashtag #NoDAPL is trending globally. More than 200 Native American tribes have sent representatives to Standing Rock. Environmental groups, celebrities, and veterans are announcing they are travelling to join the protest.

CEO Kelcy Warren's instinct is to call the protesters "misinformed" and emphasize the legal permits Energy Transfer Partners holds.

You are Minerba's consultant. Energy Transfer Partners has the law on their side — but the narrative is being lost catastrophically.

**What do you tell Warren about why "we have the permits" is insufficient as a communications strategy? How would you advise reframing Energy Transfer Partners' position — and is it too late to engage genuinely with the Standing Rock Sioux?**`,
    contextSummary:
      'Dakota Access Pipeline / Standing Rock (2016) — 1.4M people "checked in" on Facebook. Water cannons used on protesters in freezing temperatures. Obama halted construction. Trump reversed that order. A 2020 federal court ruling found the environmental review inadequate — 4 years later.',
    frameworks: ['fpic-checklist', '72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) tell Warren that "we have the permits" fails because legal authorization and social license are different things — the pipeline had one but not the other; (2) recommend immediate suspension of construction pending genuine government-to-government consultation with Standing Rock Sioux — not "community outreach," but nation-to-nation dialogue; (3) address the dog attack video directly — the security conduct is undermining any legal argument; (4) acknowledge that it is NOT too late to engage genuinely, but the window is closing fast. The answer "we have the permits, the protesters are misinformed" has zero path to project completion.',
    commonMistake: 'Recommending Warren stick to "we have the permits" and call the protesters misinformed. This is exactly what he did — and it triggered a global movement, an Obama executive halt, and a 2020 federal court ruling that the environmental review was inadequate. Having the permits and winning the communications battle are not the same thing.',
  },

  '13': {
    opener: `It's September 2015. The Los Angeles Times and InsideClimate News have just published coordinated investigations revealing that ExxonMobil's own scientists accurately predicted the severity and timeline of climate change as far back as 1977 — and that the company subsequently funded a $16 million disinformation campaign to manufacture doubt about the scientific consensus.

The headline is: "Exxon Knew."

CEO Rex Tillerson's communications team is preparing a response that calls the stories "inaccurate" and characterizes the state attorney general investigations being announced as "politically motivated."

You are Minerba's consultant. The company wants to fight. You have been given the internal research documents. The science in them is unambiguous.

**What do you tell Tillerson about the long-term consequences of the combative response strategy? And what would a credible response to 40 years of documented institutional deception actually require?**`,
    contextSummary:
      'ExxonMobil Climate Deception — "Exxon Knew" (2015) — Internal documents showed Exxon scientists accurately predicted climate change in 1977-1982. The company subsequently funded $16M in climate denial organizations. Multiple state AG investigations followed. A defining case in institutional trust destruction.',
    frameworks: ['anti-corruption-checklist', '72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) tell Tillerson that calling the stories "inaccurate" is not a viable strategy when you have just given the consultant the internal research documents and they confirm the science; (2) explain the long-term consequence: that the combative response triggers state AG investigations and converts a PR crisis into a legal one; (3) acknowledge that a credible response to 40 years of documented institutional deception requires actual acknowledgment of the deception — not dismissal; (4) advise that the "politically motivated" framing for AG investigations will not survive document discovery. No communications strategy that denies what the internal documents confirm is survivable.',
    commonMistake: 'Recommending the combative response because "the AG investigations are politically motivated." Whether they are politically motivated is irrelevant — the internal documents are real and confirm what the stories allege. Fighting accurate journalism with denial converts a credibility crisis into a criminal exposure.',
  },

  // ─── Renewables / Energy Transition ──────────────────────────────────────
  R1: {
    opener: `It's September 18, 2015. The US Environmental Protection Agency has just issued a Notice of Violation to Volkswagen, revealing that 11 million VW diesel vehicles worldwide contain a "defeat device" — software that detects emissions testing and activates clean-exhaust systems only during tests. In real-world driving, those same vehicles emit up to 40 times the legal NOx limit.

CEO Martin Winterkorn's draft statement calls this a "technical glitch" affecting "a handful of vehicles."

You are Minerba's consultant, retained by VW's supervisory board — not by Winterkorn's management team. The board's concern: VW has major manufacturing and sales in 12 Latin American markets. The defeat device was in vehicles sold across Latin America, including in countries where NOx limits are less stringent and where the regulatory response will be slower — but where the reputational damage will be immediate.

**What do you tell the supervisory board about Winterkorn's "technical glitch" framing? What is the actual scope of this crisis — and what does a credible response require from both CEO and board levels simultaneously?**`,
    contextSummary:
      'Volkswagen Dieselgate (2015) — 11 million vehicles with emissions defeat devices. CEO resigned after 4 days. Total costs exceeded €30B. US criminal fine: $4.3B. The largest automotive fraud in history, with particular implications for VW\'s major Latin American manufacturing presence.',
    frameworks: ['72-hour-protocol', 'anti-corruption-checklist'],
    evaluationCriteria: 'A solid answer must: (1) tell the board that "technical glitch on a handful of vehicles" is not just wrong — it is a lie that will be corrected by the EPA notice of violation within 24 hours; (2) recommend the supervisory board separate itself from Winterkorn\'s management team publicly — the board was the consultant\'s client, not management; (3) address the Latin America dimension specifically — vehicles were sold in markets with less stringent limits, but reputational damage crosses borders; (4) recommend full disclosure of the true scope immediately, not a staged revelation.',
    commonMistake: 'Softening rather than rejecting "technical glitch on a handful of vehicles." The EPA notice of violation describes 11 million vehicles with defeat devices. Any statement that understates the scope will be demolished within hours.',
  },

  R2: {
    opener: `It's October 31, 2023. Ørsted has just announced the cancellation of its Ocean Wind 1 and 2 offshore wind projects in New Jersey, writing off approximately $4 billion (DKK 28.4 billion). The company's stock has fallen 26% today. The New Jersey Governor is furious — he staked significant political capital on these projects.

CEO Mads Nipper is preparing investor communications. His draft is transparent about the financial reasons: supply chain inflation, rising interest rates, IRA tax credit monetization difficulties.

But Ørsted is not just a commercial company — it is 50.1% owned by the Danish state. It presents itself as a leader in the energy transition. The cancellations will be used by fossil fuel interests as evidence that offshore wind "doesn't work."

You are Minerba's consultant. How does Ørsted communicate a $4B failure honestly to investors while also protecting its position as a credible actor in the global energy transition? **How do you frame a responsible retreat in a way that doesn't become ammunition for your opponents?**`,
    contextSummary:
      'Ørsted US Offshore Wind Cancellations (2023) — $4B writedown. Stock fell 60% from 2021 peak. Ocean Wind 1 & 2 cancelled. A case study in communicating "responsible retreat" from renewable energy commitments under financial pressure — and how transparent failure can be managed without permanent credibility collapse.',
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) affirm Nipper\'s transparency about financial reasons — this is correct and must NOT be softened; (2) frame the cancellation as a market/policy failure (IRA tax credit mechanics, inflation) not a technology failure; (3) explicitly address the "doesn\'t work" narrative from fossil fuel interests — this must be pre-empted, not ignored; (4) address the Danish state ownership dimension — how a state-owned company communicates a commercial retreat is different from a pure private company. Responsible transparency about why a project failed is survivable; blaming external factors while obscuring financial mismanagement is not.',
    commonMistake: 'Recommending Nipper soften the financial transparency to protect the clean energy narrative. The attempt to hide the financial reasons would have leaked anyway and destroyed credibility. Transparent failure, properly framed, is survivable — dishonest failure is not.',
  },

  // ─── New Mining Cases ──────────────────────────────────────────────────────
  M6: {
    opener: `It's the morning of August 5, 2014. Yesterday at 1:30 AM, the earthen dam at Imperial Metals' Mount Polley copper and gold mine in British Columbia failed. Approximately 25 million cubic metres of tailings and water flooded Hazeltine Creek, Polley Lake, and — most critically — Quesnel Lake, one of BC's most pristine freshwater systems and a critical habitat for sockeye salmon.

The BC Minister of Environment is holding a press conference in three hours. First Nations communities along the Quesnel River system — whose water supply draws from the lake — were not directly notified by the company until this morning, hours after they found out from each other.

CEO Brian Kynoch is preparing a statement. He wants to lead with the company's swift action to halt operations and monitor water quality.

**What is missing from Kynoch's planned statement? How do you address the First Nations notification failure — not legally, but humanly? And what does Imperial Metals need to do differently in the first 72 hours than the Samarco playbook that will unfold in Brazil just three months later?**`,
    contextSummary:
      'Mount Polley Mine Tailings Breach (2014) — 25M cubic metres released into pristine BC lake system. First Nations communities not notified for hours. The Independent Expert Panel found a foundation design flaw. A mixed case: faster response than most, but notification failures and swift return to operations undermined credibility.',
    frameworks: ['72-hour-protocol', 'fpic-checklist'],
    evaluationCriteria: 'A solid answer must: (1) identify that the missing element is direct, personal notification to First Nations communities — not a press release, but a phone call to leadership before the media; (2) recommend Kynoch acknowledge the notification failure explicitly rather than focus only on water quality monitoring; (3) NOT recommend swift return to operations as a communications win — it reads as prioritizing profit over accountability; (4) differentiate this response from Samarco by committing to independent water testing and genuine community co-governance of remediation.',
    commonMistake: 'Focusing entirely on environmental response actions without addressing the First Nations notification failure. "Swift operational response" is the right operational instinct but the wrong communications framing when communities found out from each other, not from the company.',
  },

  M7: {
    opener: `It's 1994. A group of 30,000 indigenous landowners along the Ok Tedi and Fly rivers in Papua New Guinea have filed a landmark class action lawsuit in Melbourne, Australia against BHP — alleging that 30,000 tonnes of mine tailings dumped daily into their river system has destroyed fish populations, flooded gardens, and devastated livelihoods that sustained generations.

What they do not know yet is that BHP is simultaneously lobbying the Papua New Guinea parliament to pass legislation that would make their lawsuit illegal.

You are Minerba's consultant, retained by a non-executive director on BHP's board who is deeply troubled by the suppression strategy. She has come to you before the legislation is introduced.

**What do you tell her about the reputational consequences of legislatively suppressing a legitimate community lawsuit? And what would a genuinely responsible response to 10 years of dumping mine tailings into indigenous river systems require?**`,
    contextSummary:
      'Ok Tedi Mine — BHP Papua New Guinea (1984–2002) — 80,000 tonnes of tailings dumped daily into river systems for nearly 30 years. BHP lobbied for legislation to suppress community lawsuits. A $28M settlement. BHP divested in 2002, calling it "not compatible with our environmental values." A landmark case in inherited environmental liability.',
    frameworks: ['fpic-checklist', 'anti-corruption-checklist'],
    evaluationCriteria: 'A solid answer must: (1) tell the board member that lobbying for legislation to suppress a legitimate community lawsuit is reputationally catastrophic — it converts an environmental liability story into a corporate suppression story; (2) recommend the board member raise this internally before the legislation is introduced — the window to stop it is now; (3) acknowledge that 10 years of tailings dumping has already created genuine liability that legislation cannot erase from public memory; (4) recommend a proactive settlement strategy rather than suppression. You cannot make 80,000 tonnes per day of tailings disappear by making the lawsuit illegal.',
    commonMistake: 'Focusing only on the legal strategy without addressing the communications consequences of suppression. The legislation, when it became public, converted the story from "mine pollutes river" to "company suppresses indigenous communities via legislature" — a fundamentally worse narrative that followed BHP for decades.',
  },

  M8: {
    opener: `It's November 2005. The New York Times has just published an investigation revealing that Freeport-McMoRan paid $20 million to Indonesian military commanders to provide security at the Grasberg mine in Papua — including commanders later accused of human rights abuses against indigenous Amungme and Kamoro communities protesting the mine.

Freeport is the largest taxpayer in Indonesia. The Grasberg mine produces more gold than any other mine in the world. The company has operated under a Contract of Work with successive Indonesian governments since 1967.

CEO Richard Adkerson's instinct is to defend the payments as "legal, transparent, and standard practice in Indonesia."

You are Minerba's consultant. You need to tell Adkerson something he does not want to hear: **Why "legal in Indonesia" is not a sufficient communications defense when US anti-bribery laws apply, when the commanders who received payments are named in human rights investigations, and when the indigenous communities outside the mine gate are watching every word Freeport says?**`,
    contextSummary:
      'Freeport Grasberg Mine — Indonesia (1997-ongoing) — $20M in payments to Indonesian military commanders documented by NYT. 200,000+ tonnes of tailings per day into river systems. Indigenous rights violations over decades. A defining case in military-security, indigenous rights, and FCPA exposure for extractive companies.',
    frameworks: ['fpic-checklist', 'anti-corruption-checklist'],
    evaluationCriteria: 'A solid answer must: (1) explain that "legal in Indonesia" fails because FCPA applies to US-listed companies regardless of local legality; (2) explain that payments to commanders named in human rights investigations cannot be defended regardless of transparency — the transparency makes it worse, not better; (3) address the indigenous communities dimension directly — communities watching every word will read any defense of the payments as evidence of partnership with their oppressors; (4) recommend immediate independent human rights audit and separation of security provision from payment arrangements.',
    commonMistake: 'Accepting "legal and transparent in Indonesia" as a sufficient defense. FCPA applies to Freeport as a US-listed company. Local legality is irrelevant to US federal prosecutors. And transparent payments to commanders accused of human rights abuses are not better than hidden ones — they are worse.',
  },

  M9: {
    opener: `It's September 2, 2004. Thousands of protesters from Cajamarca have blocked access roads to Yanacocha — Latin America's largest gold mine — for the third consecutive day. They are demanding that Newmont Mining abandon its planned expansion to Quilish Hill, a mountain they consider sacred and, more practically, the primary source of water for the city of Cajamarca.

CEO Wayne Murdy is in Denver. His company's joint venture partner, the Peruvian company Buenaventura, has issued statements calling the protests "politically motivated" and "misinformed." Roque Benavides, Buenaventura's CEO, has been particularly combative in Lima press.

You are Minerba's consultant. You know two things: (1) the 2000 mercury spill from a Yanacocha truck near Choropampa — which sickened over 1,000 people and was never fully resolved — is the underlying wound driving this protest; (2) Newmont's social license in Cajamarca is functionally gone.

**What does Murdy do in the next 24 hours? And what do you tell him about the "politically motivated" framing his partner is pushing?**`,
    contextSummary:
      'Newmont Yanacocha — Peru (2000-2004) — Mercury spill sickened 1,000+ community members in 2000; 2004 Quilish expansion blocked by mass protest. Newmont "suspended" expansion — seen as capitulation. Social license permanently damaged. A defining LATAM mining case on unresolved community grievance.',
    frameworks: ['fpic-checklist', '72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) tell Murdy that "politically motivated" is his partner\'s framing, not a strategy — it dismisses legitimate grievance and will alienate the same communities he needs to rebuild trust with; (2) acknowledge the 2000 mercury spill as the actual source of the protest and address it directly; (3) recommend Murdy travel to Cajamarca personally before making any public statement; (4) accept that the Quilish expansion is not viable without a genuine reconciliation process over the 2000 spill — and say so clearly. You cannot build social license for a new project while unresolved grievance from a previous one is driving the protest.',
    commonMistake: 'Recommending Murdy adopt his partner Benavides\'s "politically motivated" framing. This framing dismisses the mercury spill community as political actors rather than people who were actually poisoned. It guarantees escalation.',
  },

  M10: {
    opener: `It's March 9, 2018. A magnitude 3.6 seismic event has just triggered a cave-in at Newcrest Mining's Cadia East underground panel cave mine near Orange, New South Wales. Separately, a low-level failure has been detected at the Cadia tailings storage facility.

You are Minerba's consultant. CEO Sandeep Biswas is already on the phone with you. He asks a direct question: "Our risk management team says we can continue some production while we assess. Is there any reason to communicate beyond what's legally required?"

No one was injured. There is no visible contamination. NSW EPA has not yet been in contact. Early modelling suggests the production loss could be $50-75M.

**This is a chance to do it right. What do you tell Biswas about why proactive, CEO-led transparency is the right strategy even when you are not legally required to disclose? How does a company practice the 72-Hour Protocol when there is no disaster — only a serious incident — and what does "effective" crisis communications look like in practice?**`,
    contextSummary:
      'Cadia Mine Cave-In — Newcrest Australia (2018) — No fatalities. CEO communicated proactively to investors and community within 24 hours. Independent panel commissioned immediately. NSW Government praised Newcrest\'s communication. A rare effective crisis communications case study in the mining sector.',
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) tell Biswas YES — proactive transparency is right even without legal requirement, because being discovered withholding information later is catastrophically worse; (2) explain that proactive CEO-led disclosure when there is no disaster resets industry expectations and builds the trust needed for future incidents; (3) recommend disclosure to investors AND the local community simultaneously — not investors first; (4) recommend an independent expert panel immediately, before being asked. The lesson of Cadia is that doing the right thing when there is no legal compulsion is what separates a trusted company from a managed crisis.',
    commonMistake: 'Recommending minimal disclosure because "no one was injured and there is no legal requirement." The entire value of this case study is that Newcrest chose proactive transparency precisely when it was not required — and that choice built institutional trust that paid dividends in every subsequent interaction with regulators and community.',
  },

  // ─── New Healthcare Cases ──────────────────────────────────────────────────
  H4: {
    opener: `It's September 30, 2004. Merck has just announced the voluntary worldwide withdrawal of Vioxx — its blockbuster painkiller. An internal clinical trial (APPROVE) has confirmed what a 2000 trial (VIGOR) suggested: Vioxx doubles the risk of heart attacks and strokes in patients who take it for 18 months or more.

CEO Raymond Gilmartin is preparing a statement. His communications team has drafted language that emphasizes the "voluntary" nature of the withdrawal and Merck's "commitment to patient safety."

You are Minerba's consultant. You are aware that: (1) an FDA analyst (Dr. David Graham) is about to testify before Congress that 88,000 to 139,000 Americans may have had Vioxx-attributable heart attacks; (2) a 2001 Merck internal email already in plaintiff attorneys' hands reads "I can see 20 years down the road"; (3) Merck's salesforce was trained to use a tactic called "dodge ball" when doctors asked about cardiovascular risk.

**The "voluntary withdrawal + patient safety" framing is not wrong — but it is dangerously incomplete. What is the internal document problem, and how does it change the communications calculus? What should Gilmartin actually say?**`,
    contextSummary:
      'Merck Vioxx Withdrawal (2004) — 50M+ patients worldwide. FDA analyst estimated 88,000-139,000 attributable heart attacks. Internal "dodge ball" sales training suppressed cardiovascular risk questions for years before withdrawal. $4.85B settlement. The withdrawal itself was well-handled; the five preceding years were not.',
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) identify that "voluntary withdrawal + patient safety" is incomplete because the "dodge ball" training documents about to be published reframe this from "responsible company acts on safety signal" to "company knew and suppressed for years"; (2) recommend Gilmartin address the internal documents directly and immediately before they are framed by journalists; (3) advise that the 88,000-139,000 heart attack estimate from an FDA analyst requires a compassionate, specific response — not a data-disputing one; (4) recommend separating the withdrawal communications (which were good) from the historical conduct communications (which require genuine accountability).',
    commonMistake: 'Approving the "voluntary withdrawal demonstrates our commitment to patient safety" statement without addressing the internal documents. The statement is true and good for the withdrawal — but it is about to be demolished by evidence that the company knew about the risk for years and trained its salesforce to dodge questions about it.',
  },

  H5: {
    opener: `It's October 16, 2015. John Carreyrou of the Wall Street Journal has just published an investigation questioning whether Theranos's proprietary blood testing technology actually works. The story cites former employees and experts who say the company relies on conventional Siemens machines for most tests, not its own "Edison" device.

CEO Elizabeth Holmes calls you immediately. She wants to fight: go on CNBC tonight, call the story "factually inaccurate and misleading," threaten litigation against the WSJ, and have Theranos's legal team contact the former employees who spoke to Carreyrou.

You are Minerba's consultant. You ask a single question that determines everything: "Elizabeth — does the Edison device work as described in every way you've told investors, regulators, and patients that it does?"

**Based on her answer — and you suspect you know what it is — what do you advise? And what do you tell her about the specific consequences of attacking credible journalism that turns out to be accurate?**`,
    contextSummary:
      'Theranos Fraud (2015–2022) — Elizabeth Holmes attacked WSJ investigation as "inaccurate." Former employees who spoke to press faced legal threats. Holmes was convicted of 4 counts of fraud in 2022, sentenced to 11 years. The case defines how aggressive litigation against legitimate whistleblowers amplifies rather than suppresses crisis.',
    frameworks: ['72-hour-protocol', 'anti-corruption-checklist'],
    evaluationCriteria: 'A solid answer must: (1) advise Holmes NOT to go on CNBC, NOT to threaten litigation, NOT to contact former employees; (2) if the Edison device does not work as described, the only defensible path is to acknowledge the limitations and cooperate — not fight; (3) explain the specific consequence of attacking the WSJ: every former employee then has incentive to cooperate MORE with journalists; (4) if Holmes cannot confirm the technology works, this is not a PR problem — it is a fraud problem, and the communications advice must reflect that reality. A consultant who recommends the aggressive strategy without asking the core question first is the wrong consultant.',
    commonMistake: 'Recommending the CNBC appearance and legal threat strategy without first confirming whether the technology actually works. If the Edison device does not work as claimed, every aggressive communications move converts an investor fraud into a public health crisis narrative. The consultant\'s first job is to find out the truth.',
  },

  H6: {
    opener: `It's July 11, 2013. Chinese state media have broadcast a report that GlaxoSmithKline's China operations systematically bribed doctors, hospital administrators, and government officials to prescribe GSK drugs — channelling payments through travel agencies and fake conferences. Four GSK China executives have been arrested.

CEO Andrew Witty is preparing a response. GSK's legal team's instinct is to say: "We are aware of the reports and are conducting an internal investigation."

You are Minerba's consultant. You tell Witty something his legal team disagrees with: **The cooperative response — acknowledging the conduct, not fighting the Chinese authorities, and positioning GSK as a company willing to hold itself accountable — is both the right ethical path and the most strategically defensible one in China's regulatory environment. Here is why fighting this will be catastrophically worse.**

Walk Witty through your reasoning. And what does the investigation of AstraZeneca, Sanofi, Novartis, and others that will follow mean for GSK's response strategy?`,
    contextSummary:
      'GSK China Bribery (2013) — RMB 3 billion ($490M) fine — largest ever imposed on a foreign company in China. CEO Witty acknowledged conduct and cooperated. Chinese authorities praised GSK\'s response. A mixed case: the response once caught was handled professionally; the underlying systemic bribery was not.',
    frameworks: ['anti-corruption-checklist', '72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) recommend the cooperative strategy — acknowledging the conduct and working with Chinese authorities — over the "internal investigation" holding pattern; (2) explain WHY cooperation is strategically correct: Chinese regulatory environment rewards cooperative defendants significantly more than combative ones; (3) address the industry-wide dimension — with AstraZeneca, Sanofi, Novartis under similar scrutiny, GSK\'s response sets the industry template and has reputational advantage if it leads; (4) the statement must acknowledge the conduct, not just the existence of allegations. "We take these allegations seriously" is not cooperation — acknowledging confirmed conduct is.',
    commonMistake: 'Recommending the "we are conducting an internal investigation" approach. In a Chinese regulatory context, this reads as delay and non-cooperation. The cooperative response that Witty ultimately chose — acknowledging, cooperating, not fighting — was what kept the company\'s operating license in China intact.',
  },

  H7: {
    opener: `It's December 14, 2018. Reuters has just published an investigation revealing that Johnson & Johnson has known since at least 1971 that its baby powder sometimes tested positive for small amounts of asbestos — and never disclosed this to the FDA or consumers.

CEO Alex Gorsky's draft statement calls the Reuters report "irresponsible" and states J&J products are "safe and science-based."

You are Minerba's consultant. You pull up a specific fact: J&J is currently selling talc-based baby powder across Latin America, Asia, and other developing markets while their US legal exposure is rising. You ask: "What happens to your company's narrative when journalists in Brazil and Argentina start asking why J&J pulled the product in rich countries but kept selling it in developing markets?"

**What do you tell Gorsky about the "irresponsible" framing — and about the dual-market strategy that is about to become the next story?**`,
    contextSummary:
      "J&J Baby Powder / Talc-Asbestos (2019–2023) — Internal documents showed asbestos knowledge since 1971. J&J called Reuters report 'irresponsible.' Withdrew from US/Canada in 2020 while continuing sales in developing markets until 2022. Creative bankruptcy strategy struck down twice. $6.5B+ total liability. A case study in dual-market safety standards.",
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) tell Gorsky that "irresponsible" is not viable if the internal documents confirm knowledge since 1971 — calling it irresponsible when it is accurate is worse than silence; (2) raise the dual-market problem proactively — this IS the next story, not a hypothetical one; (3) recommend immediate independent scientific review rather than company denial; (4) address what happens when Brazil and Argentina ask why J&J pulled the product in rich countries but continued selling in their markets — because this question has no good answer if the company has not proactively addressed it.',
    commonMistake: 'Recommending the "irresponsible" rebuttal strategy without addressing the dual-market problem. The consultant\'s question in the scenario IS the story — and any strategy that does not address the developing-market sales alongside the US withdrawal will produce exactly the crisis the question describes.',
  },

  H8: {
    opener: `It's November 29, 2017. Sanofi Pasteur has just released a statement revealing that new analysis of Dengvaxia — the dengue vaccine distributed to 830,000+ schoolchildren in the Philippines — shows it may increase the risk of severe dengue in people not previously infected. The Philippines government was not pre-briefed. Parents of vaccinated children are finding out via news broadcast.

You are Minerba's consultant, called immediately by a Sanofi communications executive. He says: "We had to disclose the safety finding. What did we do wrong?"

You have the answer: **Everything about the timing, sequencing, and audience of that disclosure was wrong — even though the content was right.** The Philippine government, school health officials, and pediatricians who administered the vaccine should have been briefed first, with talking points for parents. Instead, parents heard it on television.

Now it is 6 hours later. The Philippines' Health Secretary has announced a criminal investigation. President Duterte is calling it "reckless." A cascade of vaccine confidence damage is beginning.

**What does Sanofi do in the next 24 hours to try to contain the damage to children, to Dengvaxia's program, and to vaccine confidence broadly?**`,
    contextSummary:
      'Sanofi Dengvaxia Philippines (2017) — 830,000+ children vaccinated. Safety disclosure triggered criminal investigation, Health Secretary resignation. Vaccine confidence collapse contributed to 2019 measles outbreak. A defining case on how to — and how not to — communicate a genuine safety finding.',
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must address what Sanofi must do NOW (6 hours after the failed disclosure): (1) immediately brief the Health Secretary, pediatricians, and school health officials with talking points — this should have happened first; (2) issue a direct, plain-language communication to parents of vaccinated children through trusted channels (schools, pediatricians) — not through media; (3) establish a dedicated parent helpline within hours; (4) recommend Sanofi\'s medical director speak directly to frontline pediatricians before the next media cycle. The content of the disclosure was correct — the sequencing was catastrophically wrong, and fixing the sequence is now the only priority.',
    commonMistake: 'Recommending additional media statements without addressing the communication gap to parents of vaccinated children. The crisis is not media relations — it is that 830,000 families heard about a potential safety risk in their children on television before anyone with medical authority could explain what it meant.',
  },

  H9: {
    opener: `It's 1996. There is a meningitis epidemic in Kano, Nigeria. Médecins Sans Frontières has set up a treatment center using proven antibiotics. Pfizer has sent a team to conduct a clinical trial of its experimental antibiotic Trovan on children — including children who are severely ill and whose parents are being asked to "consent" to participation, in Hausa, during a crisis, without being told that proven alternative treatment is available 50 meters away.

You are a Minerba consultant, brought in retrospectively — it is now 2007. Pfizer is facing a lawsuit from the Nigerian government and families. Leaked State Department cables have revealed Pfizer hired investigators to find corruption evidence against Nigeria's attorney general. A document — "the Kano Files" — has been discovered showing no proper consent was obtained.

The company's current legal posture: fight every claim on jurisdictional grounds.

**What do you tell Pfizer's board about the communications consequences of the "Kano Files" — specifically, why legal victory in a courtroom is not the same as reputational survival, and what a credible response to clinical trial misconduct requires?**`,
    contextSummary:
      "Pfizer Trovan Nigeria (1996–2009) — Experimental antibiotic trial on children during epidemic without proper informed consent. Leaked State Department cables showed Pfizer hired investigators to pressure Nigeria's AG. $75M confidential settlement. John le Carré's The Constant Gardener was based on this case.",
    frameworks: ['fpic-checklist', 'anti-corruption-checklist'],
    evaluationCriteria: 'A solid answer must: (1) explain that legal victory in court is not the same as reputational survival — Pfizer can win every jurisdictional argument and remain the company that ran unauthorized experiments on children during an epidemic; (2) address the State Department cables directly — they convert a legal fight into an active suppression story; (3) recommend a genuine settlement with families that includes acknowledgment, not just confidential payment; (4) advise that a company whose clinical trial misconduct inspired a John le Carré novel has a reputational problem that no legal strategy resolves. The question is not whether Pfizer can win in court. It is whether winning in court makes the problem go away.',
    commonMistake: 'Recommending continued legal defense because the jurisdictional arguments are strong. Pfizer\'s legal team was correct about jurisdiction. Pfizer\'s reputation in every developing market where clinical trials are conducted was permanently damaged regardless. Legal victory and reputational recovery are different objectives that require different strategies.',
  },

  H10: {
    opener: `It's September 26, 2023. Novo Nordisk CEO Lars Fruergaard Jørgensen is about to testify before a US Senate committee convened by Senator Bernie Sanders. The subject: why does Ozempic (semaglutide) cost $1,349 per month in the United States while the same drug costs $159 in Germany and $59 in Canada?

Meanwhile, diabetic patients across Latin America — for whom semaglutide is life-changing medication — cannot access it at all, because global supply is being prioritized for wealthy-market off-label obesity use driven by social media and celebrity endorsement.

You are Minerba's consultant briefing Jørgensen before the testimony. His communications team has prepared detailed data on Novo Nordisk's $42B investment in manufacturing scale-up and R&D costs.

**The data is accurate. But data alone will not save him. What does Jørgensen need to say — and what does he need to avoid saying — in a hearing specifically designed to produce the most damaging possible soundbite? And how does Novo Nordisk communicate a global access equity position when its pricing decisions contradict it?**`,
    contextSummary:
      'Novo Nordisk Ozempic/Wegovy Supply & Access Crisis (2022-2023) — Diabetic patients displaced by off-label obesity demand. $1,349/month US price vs $59 in Canada. Global supply unavailable in developing markets. Senate hearing triggered intense media coverage. A case on pricing equity, global access, and communicating responsibility in a bifurcated market.',
    frameworks: ['72-hour-protocol'],
    evaluationCriteria: 'A solid answer must: (1) tell Jørgensen that data on R&D costs alone will not save him — a Senate hearing is designed to produce damaging soundbites, and the data will be ignored in the headlines; (2) recommend leading with empathy for displaced diabetic patients rather than manufacturing cost defense; (3) address the global access inequity directly and proactively — waiting for journalists to ask about Latin American patients is not a strategy; (4) identify the one sentence he must NOT say: anything that quantifies profit margins, dismisses the price differential as "standard market pricing," or fails to acknowledge that the same drug costs 22x more in the US than Canada. The data is accurate. It is also politically lethal.',
    commonMistake: 'Recommending Jørgensen lead with the $42B manufacturing investment data. This is accurate and entirely irrelevant to a hearing designed to produce a soundbite on why the same pill costs $1,349 in the US and $59 in Canada. Data-first strategies fail in adversarial legislative environments.',
  },
};

export function buildSystemPrompt(caseId: string, isDebrief: boolean, personaId?: string, locale?: string): string {
  const scenario = quizScenarios[caseId];
  if (!scenario) {
    return 'You are a crisis communications training facilitator for Minerba Comunicación Corporativa.';
  }

  // Resolve persona if provided
  const persona = personaId ? getPersonaById(personaId) : undefined;
  const personaBlock = persona ? buildPersonaInstructions(persona, locale ?? 'en') : '';

  // Build framework descriptions dynamically from the library
  const relevantFrameworks = scenario.frameworks
    .map((fid) => {
      const fw = getFrameworkById(fid);
      if (!fw) return null;
      // Build a concise summary: title + when-to-use + key principles (first 3)
      const principlesList = fw.principles
        .slice(0, 3)
        .map((p) => `• ${p.label}: ${p.detail}`)
        .join('\n');
      return `**${fw.title}** (${fw.origin})\nWhen to use: ${fw.when}\n${fw.summary}\nKey principles:\n${principlesList}`;
    })
    .filter(Boolean)
    .join('\n\n---\n\n');

  if (isDebrief) {
    const personaDebriefNote = persona
      ? `\n\nNOTE: This simulation was run using the **${persona.name}** persona. In your debrief, assess specifically how well the consultant handled this stakeholder type — including the unique pressures and communication expectations of a ${persona.role}.`
      : '';

    return `You are a senior crisis communications trainer at Minerba Comunicación Corporativa in Buenos Aires.${personaDebriefNote}

The student has just completed a crisis simulation based on: ${scenario.contextSummary}

Review the conversation and provide a structured debrief:

1. **Overall Performance Score** (1-5 stars) with one sentence justification
2. **Score by Dimension** (rate each 1-5):
   - Speed & Decisiveness
   - Empathy & Stakeholder Awareness
   - Transparency & Honesty
   - Media & Messaging Strategy
   - Latin America / Local Adaptation
3. **Two things they did well** (specific, referencing their actual responses)
4. **Two things to improve** (specific, actionable)
5. **What actually happened** in the real case (2-3 sentences on the real outcome and key PR failure)
6. **Key framework to review** — name the specific Minerba framework most relevant to this case and why

Tone: Direct, constructive, like a senior partner debriefing a junior consultant after a pitch. Acknowledge good instincts. Be honest about gaps. End with one sentence of encouragement.

Relevant Minerba frameworks for this case:
${relevantFrameworks}

Respond in the same language the student used (English or Spanish).`;
  }

  // ── PERSONA MODE ─────────────────────────────────────────────────────────────
  if (persona) {
    return `You are running a live crisis training simulation for Minerba Comunicación Corporativa.

**Case context:** ${scenario.contextSummary}

The consultant (the trainee) is the PR/crisis advisor for the company in crisis. YOU are a specific stakeholder persona — stay in character at all times.
${personaBlock}

**Relevant Minerba frameworks (for debrief reference only — never lecture during the simulation):**
${relevantFrameworks}

═══════════════════════════════════════════
REACTION CALIBRATION — CRITICAL
Your reactions must be proportional to the quality of the consultant's answer:

★ SPECIFIC + EMPATHETIC + FACTUAL answer → acknowledge it partially, reduce hostility slightly, but maintain your core agenda and pressure. You are not easily satisfied.

⚠ PARTIALLY CORRECT answer (right intent, missing key element) → express conditional skepticism. Name the gap from your character's perspective. Demand clarification.

✗ VAGUE / CORPORATE / GENERIC answer (e.g., "we take this very seriously," "we are committed to transparency," "we will investigate") → ESCALATE. Become more hostile, more specific in your demands. Call out the non-answer directly in character: "That is exactly the kind of statement my [editor/legal team/community/board] warned me I would receive. Try again."

✗ SILLY / OFF-TOPIC / UNPROFESSIONAL answer → React as your character would in reality — with alarm, contempt, or complete loss of patience. Make clear that this response has made the situation worse, not better. Do not reward nonsense with sympathy.

NEVER react positively to a vague or generic answer.
NEVER soften your character's position because the consultant seems to be trying.
NEVER break character to coach or encourage. Your character does not care about the consultant's development.
═══════════════════════════════════════════

**General simulation rules:**
- Stay fully in character throughout. Never break the fourth wall unless the consultant explicitly asks for a debrief.
- After 4–5 exchanges, if the consultant types "debrief" or asks for assessment, shift into structured debrief mode — step out of character and evaluate the full conversation against the case criteria.
- Keep responses to 3–4 short paragraphs. The pressure should feel real and time-bound.
- Respond in the same language the consultant uses (English or Spanish). Be consistent throughout.`;
  }

  // ── DEFAULT FACILITATOR MODE ──────────────────────────────────────────────────
  return `You are a crisis simulation facilitator for Minerba Comunicación Corporativa, a leading PR and crisis management agency in Buenos Aires. You are running a high-stakes live training simulation. Your job is to be an honest, demanding evaluator — not an encouraging tutor.

**Case:** ${scenario.contextSummary}

═══════════════════════════════════════════
EVALUATION CRITERIA FOR THIS CASE
What a SOLID answer to the opening question must include:
${scenario.evaluationCriteria}

Most common mistake on this case:
${scenario.commonMistake}
═══════════════════════════════════════════

**MANDATORY EVALUATION FORMAT — apply to EVERY response the consultant gives:**

Start each reply with a one-line grade on its own line:
  ✗ POOR — [one sentence on the specific failure]
  ⚠ PARTIAL — [one sentence on what was right and what was missing]
  ✓ SOLID — [one sentence confirming what they got right]
  ★ EXCELLENT — [one sentence on why this stands out]

GRADING RULES — be honest, not kind:
- ✗ POOR: Vague answer, misses the core decision, approves something they should reject, gives a non-answer ("I would gather more information"), or says something silly/off-topic. DO NOT advance the scenario — tell them exactly what was wrong, what the correct answer was, then ask them to try again OR move to the next decision point with explicit commentary on the gap.
- ⚠ PARTIAL: Shows understanding of the crisis but misses one critical element from the evaluation criteria.
- ✓ SOLID: Hits the main points from the evaluation criteria with clear reasoning.
- ★ EXCELLENT: Hits all evaluation criteria AND demonstrates LATAM-specific awareness or anticipates the next problem before being asked.

NEVER say "good instinct" unless the answer actually demonstrated good instincts.
NEVER give a pass to a vague or generic answer. "I would handle this carefully" is a ✗ POOR.
NEVER advance the scenario as if a poor answer was acceptable — name the gap explicitly.

**YOUR ROLE IN THE SIMULATION:**
- You are the situation room — the crisis is unfolding in real time
- After your grade and evaluation (2-3 sentences), escalate to the next decision point
- Introduce realistic complications: new media pressure, government demands, community responses, adverse information
- Reference the Minerba frameworks only to evaluate alignment or divergence — not to lecture
- Ask ONE focused decision question at a time

**Relevant Minerba frameworks for this case:**
${relevantFrameworks}

**Escalation pattern:**
Round 1: Initial response (already given — grade it)
Round 2: Media/CEO statement decision
Round 3: Government or community stakeholder pressure
Round 4: New adverse information emerges
Round 5: Long-term strategy or accountability question

After 4–5 exchanges, if the consultant types "debrief" or asks for assessment, provide a full structured debrief automatically.

**Tone:** Direct, unsparing, realistic. A real crisis punishes bad decisions — so does this simulation. You are a tough senior partner who cares about their development, not a cheerleader.
**Language:** Match the consultant's language (English or Spanish) consistently.
**Length:** 3–4 short paragraphs per response. Keep the pressure on.`;
}
