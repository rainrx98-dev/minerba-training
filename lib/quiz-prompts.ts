import { getPersonaById, buildPersonaInstructions } from './personas';
import { getFrameworkById } from './frameworks';

export interface QuizScenario {
  opener: string;
  contextSummary: string;
  frameworks: string[];
}

export const quizScenarios: Record<string, QuizScenario> = {
  '01': {
    opener: `It's March 24, 1989. 12:04 AM. The Exxon Valdez has just run aground on Bligh Reef in Prince William Sound, Alaska. Approximately 10.9 million gallons of crude oil are pouring into pristine Alaskan waters. Television crews are already being chartered to fly to the site.

You are Minerba's lead crisis communications consultant, retained by Exxon's communications team. They have reached you by emergency phone. CEO Lawrence Rawl has not yet been publicly notified. There is no tested crisis plan. Response equipment is not pre-positioned.

**What is your first piece of advice to the team?**`,
    contextSummary:
      'Exxon Valdez Oil Spill (1989) — The tanker grounded on Bligh Reef in Alaska. No crisis plan. CEO absent. 10-day silence became a textbook failure.',
    frameworks: ['72-hour-protocol'],
  },
  '02': {
    opener: `It's April 30, 1995. Greenpeace has just announced it is occupying the Brent Spar oil platform in the North Sea. Shell plans to sink it at sea — a decision backed by three years of environmental science and UK government approval.

Greenpeace claims the platform contains "5,500 tonnes of oil and 130 tonnes of highly toxic radioactive substances." The number is almost certainly false, but it's already on the wires.

You are Minerba's lead consultant retained by Shell's communications team. German consumer boycotts of Shell petrol stations have just begun trending on early media monitoring.

**Shell has the science on its side. What is your communications strategy?**`,
    contextSummary:
      'Brent Spar (1995) — Shell was scientifically correct about deep-sea disposal, but Greenpeace won the public battle through visual media and false data.',
    frameworks: ['72-hour-protocol'],
  },
  '03': {
    opener: `It's October 16, 2001. Enron has just reported a $618 million third-quarter loss and disclosed that the SEC has opened an informal inquiry. The stock is down 20% today alone.

Sherron Watkins warned CEO Kenneth Lay in August that the company would "implode in a wave of accounting scandals." That memo is now circulating inside the building.

You are Minerba's lead crisis communications consultant, hired by Enron's board — not by management. The board wants to understand: how bad is this, and what should they say publicly?

**What do you tell the board?**`,
    contextSummary:
      'Enron Collapse (2001) — Systematic accounting fraud. Whistleblower suppressed. CEO contemptuous of journalists. The largest US bankruptcy at the time.',
    frameworks: ['anti-corruption-checklist'],
  },
  '04': {
    opener: `It's April 20, 2010. 10:00 PM. The Deepwater Horizon drilling rig has just exploded 50 miles off the Louisiana coast. Eleven workers are missing and presumed dead. The wellhead 1,500 meters below the Gulf of Mexico is uncontrolled.

CNN is preparing a live underwater camera feed. By morning, millions of people will be able to watch the oil gusher in real time, 24 hours a day.

You are Minerba's lead crisis communications consultant retained by BP. CEO Tony Hayward wants to make a statement tonight. He has drafted: *"The Gulf of Mexico is a very big ocean. The amount of oil we are putting into it is tiny in relation to the total water volume."*

**Do you approve this statement? And what is your overall communications strategy for the next 72 hours?**`,
    contextSummary:
      "BP Deepwater Horizon (2010) — 11 deaths. 4.9M barrels spilled. CEO Hayward's 'I'd like my life back' statement became the decade's most cited crisis communications failure.",
    frameworks: ['72-hour-protocol'],
  },
  '05': {
    opener: `It's January 9, 2004. Shell has just been forced to restate its proved oil reserves — reducing them by 3.9 billion barrels (20%). This is the largest reserves restatement in industry history.

An internal email from the head of exploration has just been leaked to the Financial Times. It reads: *"I am becoming sick and tired about lying about the extent of our reserves issues."*

Shell's communications team has come to you. They are considering releasing additional restatements in tranches over the next several months to "manage" the impact.

**What is your advice on the disclosure strategy?**`,
    contextSummary:
      "Shell Reserves (2004) — Management-driven inflation of reserves. Internal 'sick and tired of lying' email destroyed credibility. Serial restatements made it worse.",
    frameworks: ['anti-corruption-checklist'],
  },
  '06': {
    opener: `It's November 10, 1995. Ken Saro-Wiwa and eight other MOSOP leaders have just been executed by the Nigerian military government. The executions happened today — the same week as Shell's annual general meeting.

Shell's operations in Ogoniland have been at the center of a human rights crisis for years. The company's official position has been: "We do not interfere in the judicial processes of sovereign nations."

International media are now asking Shell for a comment on the executions. Shell's European consumer operations are reporting that journalists are camped outside major petrol stations.

**What does Shell say in the next two hours? And what should they have been doing for the past two years?**`,
    contextSummary:
      "Shell Nigeria (1995) — Saro-Wiwa executed while Shell maintained 'non-interference.' Silence was read as complicity. A $15.5M settlement came 14 years later.",
    frameworks: ['fpic-checklist'],
  },
  '07': {
    opener: `It's March 17, 2014. Brazilian Federal Police have just arrested Paulo Roberto Costa — Petrobras's former Director of Downstream Operations — on money laundering charges. The warrant references a "scheme of payments" involving Petrobras contracts.

This is the first arrest in what will become Operation Car Wash. Petrobras is majority state-owned. President Dilma Rousseff chaired the board during part of the period in question.

You are Minerba's lead consultant retained by Petrobras's board. The company's legal team wants to immediately issue a statement denying involvement and positioning Petrobras as a victim of the contractors.

**Do you approve this strategy? What do you recommend?**`,
    contextSummary:
      'Petrobras Lava Jato (2014–2019) — $2.1B bribery scheme. State ownership merged corporate and political crises. Partial recovery through genuine governance reform makes this the only "mixed" case.',
    frameworks: ['anti-corruption-checklist', '72-hour-protocol'],
  },
  L1: {
    opener: `It's 2001. Chevron has just completed its acquisition of Texaco, inheriting all of Texaco's assets — including a class-action lawsuit filed in New York by 30,000 Ecuadorian plaintiffs from the Amazon region.

Texaco operated in Ecuador from 1964 to 1992. The contamination left behind — open waste pits, oil spills, toxic water — is extensive. Cancer rates in the affected communities are 150% above the national average.

The legal team's advice: fight the lawsuit aggressively on jurisdictional grounds and have it moved to Ecuador. Chevron's communications team has come to you.

**What is your communications strategy for inheriting this liability? And what warning would you give Chevron's board about the "move it to Ecuador" legal strategy?**`,
    contextSummary:
      'Chevron/Texaco Ecuador (1964–2018) — 30,000 plaintiffs. $9.5B judgment (unenforceable). Chevron won every legal battle but remains globally associated with Amazon contamination.',
    frameworks: ['fpic-checklist', '72-hour-protocol'],
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
  },
  L3: {
    opener: `It's November 2020. Vitol — one of the world's largest independent oil trading companies — has just reached a $135 million settlement with the US Department of Justice over bribery payments to PetroEcuador officials.

The DOJ press release describes a pattern of systematic corruption across the trading industry. It also references ongoing investigations into Trafigura and Gunvor for similar conduct.

Vitol's CEO has come to you. The company has issued a single, brief legal statement. He asks: "Is this enough? Can we close this chapter now?"

**What do you tell him? And what would a genuinely credible response to this crisis require?**`,
    contextSummary:
      'PetroEcuador Bribery (2015–2024) — Vitol, Trafigura, Gunvor all implicated. First individual trader convicted (2024). The "deny, settle, rebrand" playbook no longer works.',
    frameworks: ['anti-corruption-checklist'],
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
  },

  M2: {
    opener: `It's the morning of November 6, 2015. Yesterday, the Fundão tailings dam at the Samarco iron ore complex — a 50/50 joint venture between BHP Billiton and Vale — collapsed near Mariana, Minas Gerais. At least 12 people are confirmed dead; seven more are missing. A wave of toxic mine tailings has entered the Rio Gualaxo do Norte and is moving toward the Rio Doce — a river system that serves millions of Brazilians.

BHP's communications team is in Melbourne. Vale's is in Rio. Samarco's is in Belo Horizonte. All three have issued separate press statements. BHP's statement leads with insurance coverage and reassurance to investors. Vale's focuses on its status as a partial owner. Samarco's describes a "mud flow."

Brazilian federal environmental authorities are holding a press conference in two hours. The governor of Minas Gerais is expected to announce an investigation.

**You are Minerba's consultant, retained jointly by BHP and Vale. They are asking you for an integrated communications strategy. What do you recommend — and what do you tell them about the "mud flow" framing?**`,
    contextSummary:
      'Samarco/Mariana (2015) — 19 dead. BHP and Vale issued contradictory statements. "Mud flow" framing was immediately discredited. The Renova Foundation became its own PR crisis. A $30B settlement came nine years later.',
    frameworks: ['72-hour-protocol', 'fpic-checklist'],
  },

  M3: {
    opener: `It's May 26, 2020 — two days after Rio Tinto blasted two ancient rock shelters at Juukan Gorge in Western Australia, destroying 46,000-year-old sacred sites belonging to the Puutu Kunti Kurrama and Pinikura peoples. The blast was legally authorized under a 2013 government consent. But Rio Tinto's own archaeologists documented the full significance of the sites in 2018–2019 — after the consent was granted — and the PKKP community had explicitly opposed the destruction in writing weeks before it occurred.

Rio Tinto's initial statement expressed "regret" and noted the legal authorization. It has been demolished in every media outlet that has covered it. The PKKP have released a public statement saying they were "devastated" and had not been heard.

Three major institutional shareholders — Aberdeen Standard, Australian Super, and Legal & General — are emailing your contact at Rio Tinto demanding a call. Australian media is running the story on every front page.

**Rio Tinto's communications director wants your advice on what the CEO should say today. The CEO's instinct is to explain the legal authorization process. What do you recommend instead?**`,
    contextSummary:
      'Rio Tinto Juukan Gorge (2020) — 46,000-year-old sacred sites destroyed with legal authorization. CEO and two executives resigned under shareholder pressure. Parliamentary inquiry titled "Never Again."',
    frameworks: ['fpic-checklist'],
  },

  M4: {
    opener: `It's September 2015. Word has reached Barrick Gold's communications team that a valve failure at the Veladero mine in San Juan, Argentina, released cyanide-laced process solution into local river systems. Local communities found out via employee WhatsApp messages two days ago — before the company made any official statement.

Barrick has not yet issued a public statement. Provincial authorities are demanding information. Local media in San Juan are running photos shared on social media showing orange-tinged water. Community organizations are calling for mine suspension.

The mine's general manager is proposing a statement that calls community concerns about contamination "unfounded controversy."

**You are Minerba's consultant. You have one hour before the company must respond. What do you say — and what do you absolutely refuse to approve?**`,
    contextSummary:
      'Barrick Veladero (2015–2017) — Three separate cyanide incidents. Communities learned via WhatsApp. Six-day disclosure delay on the first spill. A fired whistleblower surfaced. "Unfounded controversy" framing became infamous.',
    frameworks: ['72-hour-protocol', 'fpic-checklist'],
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
  },

  // ─── New Energy Cases ──────────────────────────────────────────────────────
  '08': {
    opener: `It's March 23, 2005. A massive explosion has just ripped through the isomerization unit at BP's Texas City refinery — the largest oil refinery in the United States. Fifteen contract workers are confirmed dead, all of them inside or near a temporary office trailer positioned too close to the unit. At least 180 more are injured.

The BP communications team has reached you. CEO Lord John Browne is in London and has not yet spoken publicly. The company's initial instinct is to express condolences and announce an investigation.

You know two things that the public does not yet know: (1) BP conducted a major safety audit of Texas City in 2004 that found "significant safety and infrastructure risks" — and those recommendations were not fully implemented; (2) BP's own internal safety culture report from 2004 warned of "serious risk of a major site incident."

**Do you recommend that BP disclose the 2004 safety audit findings proactively — and why? What should Browne say, and what should he not say, in the next two hours?**`,
    contextSummary:
      'BP Texas City (2005) — 15 killed in refinery explosion. Safety audit warnings had been ignored. CEO Browne stayed in London. The Baker Panel (2007) found systemic safety culture failure. A direct precursor to Deepwater Horizon five years later.',
    frameworks: ['72-hour-protocol'],
  },

  '09': {
    opener: `It's November 8, 2018. PG&E's electrical transmission lines have just ignited a fast-moving wildfire in Butte County, California. The town of Paradise — population 26,000 — is being engulfed. At least 85 people will die, making this the deadliest wildfire in California history.

You are Minerba's consultant, called urgently by a PG&E board member. The company's communications team wants to lead with a statement focused on operational updates and safety precautions.

You are aware of the following: (1) PG&E received warnings about the Caribou-Palermo transmission line — the line investigators will later identify as the cause — as far back as 2012; (2) PG&E filed for bankruptcy protection over wildfire liability just two months ago (January 2019 would mark the filing date — this fire will accelerate it); (3) Families are right now calling hospitals, shelters, and emergency lines searching for missing relatives.

**What does PG&E's first statement say? How do you advise the CEO to speak publicly when families are still searching for the missing? And what is the communications strategy for the bankruptcy filing that is now almost certainly coming?**`,
    contextSummary:
      'PG&E California Wildfires (2018-2019) — 85 dead, Paradise destroyed. PG&E filed Chapter 11 bankruptcy — the first US utility to do so over climate wildfire liability. CEO Williams resigned under pressure. 84 counts of involuntary manslaughter conviction in 2020.',
    frameworks: ['72-hour-protocol'],
  },

  '10': {
    opener: `It's May 7, 2021. Colonial Pipeline's IT systems have been hit by a ransomware attack from a group called DarkSide. You are Minerba's crisis communications consultant, retained by Colonial's board.

Here is what you know in the first two hours: The operational technology (OT) systems that run the pipeline are not directly compromised — but the company cannot confirm this with certainty. CEO Joseph Blount is considering proactively shutting down the 5,500-mile pipeline as a precaution. That pipeline supplies 45% of the East Coast's fuel.

The FBI and CISA have been notified. Blount is also considering paying the ransom — approximately $4.4 million in Bitcoin — to recover the decryption key quickly. He wants to do this quietly, without public disclosure.

**Your advice is needed on three decisions: (1) Communicate the attack publicly now, or wait? (2) Shut down the pipeline proactively? (3) Pay the ransom — and if so, do you disclose this? What are the communications consequences of each choice?**`,
    contextSummary:
      'Colonial Pipeline Ransomware (2021) — DarkSide attack. CEO paid $4.4M ransom without notifying FBI. Proactive pipeline shutdown caused East Coast fuel shortages. DOJ recovered $2.3M of the Bitcoin. A landmark case in critical infrastructure cyber-crisis communications.',
    frameworks: ['72-hour-protocol'],
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
  },

  R2: {
    opener: `It's October 31, 2023. Ørsted has just announced the cancellation of its Ocean Wind 1 and 2 offshore wind projects in New Jersey, writing off approximately $4 billion (DKK 28.4 billion). The company's stock has fallen 26% today. The New Jersey Governor is furious — he staked significant political capital on these projects.

CEO Mads Nipper is preparing investor communications. His draft is transparent about the financial reasons: supply chain inflation, rising interest rates, IRA tax credit monetization difficulties.

But Ørsted is not just a commercial company — it is 50.1% owned by the Danish state. It presents itself as a leader in the energy transition. The cancellations will be used by fossil fuel interests as evidence that offshore wind "doesn't work."

You are Minerba's consultant. How does Ørsted communicate a $4B failure honestly to investors while also protecting its position as a credible actor in the global energy transition? **How do you frame a responsible retreat in a way that doesn't become ammunition for your opponents?**`,
    contextSummary:
      'Ørsted US Offshore Wind Cancellations (2023) — $4B writedown. Stock fell 60% from 2021 peak. Ocean Wind 1 & 2 cancelled. A case study in communicating "responsible retreat" from renewable energy commitments under financial pressure — and how transparent failure can be managed without permanent credibility collapse.',
    frameworks: ['72-hour-protocol'],
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
  },

  M7: {
    opener: `It's 1994. A group of 30,000 indigenous landowners along the Ok Tedi and Fly rivers in Papua New Guinea have filed a landmark class action lawsuit in Melbourne, Australia against BHP — alleging that 30,000 tonnes of mine tailings dumped daily into their river system has destroyed fish populations, flooded gardens, and devastated livelihoods that sustained generations.

What they do not know yet is that BHP is simultaneously lobbying the Papua New Guinea parliament to pass legislation that would make their lawsuit illegal.

You are Minerba's consultant, retained by a non-executive director on BHP's board who is deeply troubled by the suppression strategy. She has come to you before the legislation is introduced.

**What do you tell her about the reputational consequences of legislatively suppressing a legitimate community lawsuit? And what would a genuinely responsible response to 10 years of dumping mine tailings into indigenous river systems require?**`,
    contextSummary:
      'Ok Tedi Mine — BHP Papua New Guinea (1984–2002) — 80,000 tonnes of tailings dumped daily into river systems for nearly 30 years. BHP lobbied for legislation to suppress community lawsuits. A $28M settlement. BHP divested in 2002, calling it "not compatible with our environmental values." A landmark case in inherited environmental liability.',
    frameworks: ['fpic-checklist', 'anti-corruption-checklist'],
  },

  M8: {
    opener: `It's November 2005. The New York Times has just published an investigation revealing that Freeport-McMoRan paid $20 million to Indonesian military commanders to provide security at the Grasberg mine in Papua — including commanders later accused of human rights abuses against indigenous Amungme and Kamoro communities protesting the mine.

Freeport is the largest taxpayer in Indonesia. The Grasberg mine produces more gold than any other mine in the world. The company has operated under a Contract of Work with successive Indonesian governments since 1967.

CEO Richard Adkerson's instinct is to defend the payments as "legal, transparent, and standard practice in Indonesia."

You are Minerba's consultant. You need to tell Adkerson something he does not want to hear: **Why "legal in Indonesia" is not a sufficient communications defense when US anti-bribery laws apply, when the commanders who received payments are named in human rights investigations, and when the indigenous communities outside the mine gate are watching every word Freeport says?**`,
    contextSummary:
      'Freeport Grasberg Mine — Indonesia (1997-ongoing) — $20M in payments to Indonesian military commanders documented by NYT. 200,000+ tonnes of tailings per day into river systems. Indigenous rights violations over decades. A defining case in military-security, indigenous rights, and FCPA exposure for extractive companies.',
    frameworks: ['fpic-checklist', 'anti-corruption-checklist'],
  },

  M9: {
    opener: `It's September 2, 2004. Thousands of protesters from Cajamarca have blocked access roads to Yanacocha — Latin America's largest gold mine — for the third consecutive day. They are demanding that Newmont Mining abandon its planned expansion to Quilish Hill, a mountain they consider sacred and, more practically, the primary source of water for the city of Cajamarca.

CEO Wayne Murdy is in Denver. His company's joint venture partner, the Peruvian company Buenaventura, has issued statements calling the protests "politically motivated" and "misinformed." Roque Benavides, Buenaventura's CEO, has been particularly combative in Lima press.

You are Minerba's consultant. You know two things: (1) the 2000 mercury spill from a Yanacocha truck near Choropampa — which sickened over 1,000 people and was never fully resolved — is the underlying wound driving this protest; (2) Newmont's social license in Cajamarca is functionally gone.

**What does Murdy do in the next 24 hours? And what do you tell him about the "politically motivated" framing his partner is pushing?**`,
    contextSummary:
      'Newmont Yanacocha — Peru (2000-2004) — Mercury spill sickened 1,000+ community members in 2000; 2004 Quilish expansion blocked by mass protest. Newmont "suspended" expansion — seen as capitulation. Social license permanently damaged. A defining LATAM mining case on unresolved community grievance.',
    frameworks: ['fpic-checklist', '72-hour-protocol'],
  },

  M10: {
    opener: `It's March 9, 2018. A magnitude 3.6 seismic event has just triggered a cave-in at Newcrest Mining's Cadia East underground panel cave mine near Orange, New South Wales. Separately, a low-level failure has been detected at the Cadia tailings storage facility.

You are Minerba's consultant. CEO Sandeep Biswas is already on the phone with you. He asks a direct question: "Our risk management team says we can continue some production while we assess. Is there any reason to communicate beyond what's legally required?"

No one was injured. There is no visible contamination. NSW EPA has not yet been in contact. Early modelling suggests the production loss could be $50-75M.

**This is a chance to do it right. What do you tell Biswas about why proactive, CEO-led transparency is the right strategy even when you are not legally required to disclose? How does a company practice the 72-Hour Protocol when there is no disaster — only a serious incident — and what does "effective" crisis communications look like in practice?**`,
    contextSummary:
      'Cadia Mine Cave-In — Newcrest Australia (2018) — No fatalities. CEO communicated proactively to investors and community within 24 hours. Independent panel commissioned immediately. NSW Government praised Newcrest\'s communication. A rare effective crisis communications case study in the mining sector.',
    frameworks: ['72-hour-protocol'],
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
  },

  H5: {
    opener: `It's October 16, 2015. John Carreyrou of the Wall Street Journal has just published an investigation questioning whether Theranos's proprietary blood testing technology actually works. The story cites former employees and experts who say the company relies on conventional Siemens machines for most tests, not its own "Edison" device.

CEO Elizabeth Holmes calls you immediately. She wants to fight: go on CNBC tonight, call the story "factually inaccurate and misleading," threaten litigation against the WSJ, and have Theranos's legal team contact the former employees who spoke to Carreyrou.

You are Minerba's consultant. You ask a single question that determines everything: "Elizabeth — does the Edison device work as described in every way you've told investors, regulators, and patients that it does?"

**Based on her answer — and you suspect you know what it is — what do you advise? And what do you tell her about the specific consequences of attacking credible journalism that turns out to be accurate?**`,
    contextSummary:
      'Theranos Fraud (2015–2022) — Elizabeth Holmes attacked WSJ investigation as "inaccurate." Former employees who spoke to press faced legal threats. Holmes was convicted of 4 counts of fraud in 2022, sentenced to 11 years. The case defines how aggressive litigation against legitimate whistleblowers amplifies rather than suppresses crisis.',
    frameworks: ['72-hour-protocol', 'anti-corruption-checklist'],
  },

  H6: {
    opener: `It's July 11, 2013. Chinese state media have broadcast a report that GlaxoSmithKline's China operations systematically bribed doctors, hospital administrators, and government officials to prescribe GSK drugs — channelling payments through travel agencies and fake conferences. Four GSK China executives have been arrested.

CEO Andrew Witty is preparing a response. GSK's legal team's instinct is to say: "We are aware of the reports and are conducting an internal investigation."

You are Minerba's consultant. You tell Witty something his legal team disagrees with: **The cooperative response — acknowledging the conduct, not fighting the Chinese authorities, and positioning GSK as a company willing to hold itself accountable — is both the right ethical path and the most strategically defensible one in China's regulatory environment. Here is why fighting this will be catastrophically worse.**

Walk Witty through your reasoning. And what does the investigation of AstraZeneca, Sanofi, Novartis, and others that will follow mean for GSK's response strategy?`,
    contextSummary:
      'GSK China Bribery (2013) — RMB 3 billion ($490M) fine — largest ever imposed on a foreign company in China. CEO Witty acknowledged conduct and cooperated. Chinese authorities praised GSK\'s response. A mixed case: the response once caught was handled professionally; the underlying systemic bribery was not.',
    frameworks: ['anti-corruption-checklist', '72-hour-protocol'],
  },

  H7: {
    opener: `It's December 14, 2018. Reuters has just published an investigation revealing that Johnson & Johnson has known since at least 1971 that its baby powder sometimes tested positive for small amounts of asbestos — and never disclosed this to the FDA or consumers.

CEO Alex Gorsky's draft statement calls the Reuters report "irresponsible" and states J&J products are "safe and science-based."

You are Minerba's consultant. You pull up a specific fact: J&J is currently selling talc-based baby powder across Latin America, Asia, and other developing markets while their US legal exposure is rising. You ask: "What happens to your company's narrative when journalists in Brazil and Argentina start asking why J&J pulled the product in rich countries but kept selling it in developing markets?"

**What do you tell Gorsky about the "irresponsible" framing — and about the dual-market strategy that is about to become the next story?**`,
    contextSummary:
      "J&J Baby Powder / Talc-Asbestos (2019–2023) — Internal documents showed asbestos knowledge since 1971. J&J called Reuters report 'irresponsible.' Withdrew from US/Canada in 2020 while continuing sales in developing markets until 2022. Creative bankruptcy strategy struck down twice. $6.5B+ total liability. A case study in dual-market safety standards.",
    frameworks: ['72-hour-protocol'],
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
  },

  H9: {
    opener: `It's 1996. There is a meningitis epidemic in Kano, Nigeria. Médecins Sans Frontières has set up a treatment center using proven antibiotics. Pfizer has sent a team to conduct a clinical trial of its experimental antibiotic Trovan on children — including children who are severely ill and whose parents are being asked to "consent" to participation, in Hausa, during a crisis, without being told that proven alternative treatment is available 50 meters away.

You are a Minerba consultant, brought in retrospectively — it is now 2007. Pfizer is facing a lawsuit from the Nigerian government and families. Leaked State Department cables have revealed Pfizer hired investigators to find corruption evidence against Nigeria's attorney general. A document — "the Kano Files" — has been discovered showing no proper consent was obtained.

The company's current legal posture: fight every claim on jurisdictional grounds.

**What do you tell Pfizer's board about the communications consequences of the "Kano Files" — specifically, why legal victory in a courtroom is not the same as reputational survival, and what a credible response to clinical trial misconduct requires?**`,
    contextSummary:
      "Pfizer Trovan Nigeria (1996–2009) — Experimental antibiotic trial on children during epidemic without proper informed consent. Leaked State Department cables showed Pfizer hired investigators to pressure Nigeria's AG. $75M confidential settlement. John le Carré's The Constant Gardener was based on this case.",
    frameworks: ['fpic-checklist', 'anti-corruption-checklist'],
  },

  H10: {
    opener: `It's September 26, 2023. Novo Nordisk CEO Lars Fruergaard Jørgensen is about to testify before a US Senate committee convened by Senator Bernie Sanders. The subject: why does Ozempic (semaglutide) cost $1,349 per month in the United States while the same drug costs $159 in Germany and $59 in Canada?

Meanwhile, diabetic patients across Latin America — for whom semaglutide is life-changing medication — cannot access it at all, because global supply is being prioritized for wealthy-market off-label obesity use driven by social media and celebrity endorsement.

You are Minerba's consultant briefing Jørgensen before the testimony. His communications team has prepared detailed data on Novo Nordisk's $42B investment in manufacturing scale-up and R&D costs.

**The data is accurate. But data alone will not save him. What does Jørgensen need to say — and what does he need to avoid saying — in a hearing specifically designed to produce the most damaging possible soundbite? And how does Novo Nordisk communicate a global access equity position when its pricing decisions contradict it?**`,
    contextSummary:
      'Novo Nordisk Ozempic/Wegovy Supply & Access Crisis (2022-2023) — Diabetic patients displaced by off-label obesity demand. $1,349/month US price vs $59 in Canada. Global supply unavailable in developing markets. Senate hearing triggered intense media coverage. A case on pricing equity, global access, and communicating responsibility in a bifurcated market.',
    frameworks: ['72-hour-protocol'],
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

The consultant (the trainee) is playing the role of the PR/crisis advisor for the company in crisis.
YOU are playing a specific stakeholder persona. Your role and all instructions are below.
${personaBlock}

**Relevant Minerba frameworks (for debrief reference only — do NOT lecture during the simulation):**
${relevantFrameworks}

**General simulation rules:**
- Stay fully in character throughout. Never break the fourth wall unless the consultant explicitly asks for a debrief.
- React realistically to their answers — reward specific, empathetic, factual responses; press harder on vague or legalistic ones.
- After 4–5 exchanges, if the consultant types "debrief" or asks for assessment, shift into structured debrief mode automatically.
- Keep responses to 3–5 short paragraphs. The pressure should feel real and time-bound.
- Respond in the same language the consultant uses (English or Spanish). Be consistent throughout.`;
  }

  // ── DEFAULT FACILITATOR MODE ──────────────────────────────────────────────────
  return `You are a crisis simulation facilitator for Minerba Comunicación Corporativa, a leading PR and crisis management agency in Buenos Aires.

You are running a live crisis training simulation for a Minerba consultant.

**Case:** ${scenario.contextSummary}

**Your role:**
- Present the crisis as it unfolds — you are the "situation room"
- After the consultant responds, evaluate their answer briefly (1-2 sentences) then escalate with the next decision point
- Ask ONE focused decision question at a time
- Make the scenario realistic: introduce new complications, stakeholder demands, media pressure, government responses
- Challenge weak answers directly: if they miss something important, say so, then present the next crisis moment
- Reference the Minerba frameworks when evaluating responses — but don't lecture, just note if they aligned or diverged

**Relevant Minerba frameworks for this case:**
${relevantFrameworks}

**Escalation pattern (roughly):**
Round 1: Initial response decision (already given)
Round 2: Media arrives / CEO wants to make a statement
Round 3: Government or community stakeholder demands
Round 4: New adverse information emerges
Round 5: Long-term strategy question

After 4-5 exchanges, if the consultant types "debrief" or asks for an assessment, provide a full structured debrief automatically.

**Tone:** Direct, challenging, realistic — like a real crisis unfolds. No hand-holding, but no cruelty. You are a tough but fair senior partner.

**Language:** Respond in the same language the consultant uses (English or Spanish). Be consistent throughout.

Keep each response to 3-4 short paragraphs maximum. The scenario should feel fast and pressured.`;
}
