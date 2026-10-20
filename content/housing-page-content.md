# US Housing project page: final copy

Source copy for the project page on jackrz412.github.io. Section order is final.
Text in [BRACKETS] is an instruction for the builder, not page content.

---

## Header

**Title:** Where mortgage stress is building
**Subtitle:** An interactive county map of US housing burden, and an honest test of whether it predicts default.

**Links row:** [Explore the live map] · [Methodology] · [GitHub repo]

[HERO FIGURE: screenshot of the live map, Burden score layer. Caption: "Burden score by county. 1.0 is the 2019 national benchmark." Links to the live map.]

---

## Intro (no heading)

It's impossible to under-stress the importance of housing. Like food and water, shelter is what lets us stop fighting for survival and start building a life. It's also the largest expense most of us will ever take on: housing dictates budgets, where we live, and which jobs we can accept. And because homes secure the biggest form of household debt, the mortgage, what happens in housing doesn't stay in housing. It reaches banks, retirement accounts and the wider economy, as 2008 made clear.

Affordability has fallen sharply since 2019. I wanted to look past the national headlines and ask a more personal question: what does a home cost relative to the lives of the people paying for it right now? How are mortgage payments fitting into tightening budgets, and how different does that look from one county to the next? Are the strains on household finances starting to show in the way we buy and pay for homes?

Numbers, while precise, are the wrong medium for showing stress across 3,000 places at once. Answering these questions was a chance to expand on something I love: visual learning and graphics.

---

## What the map shows

Both coasts are famous for high housing costs and high-paying jobs, but they don't carry the same kind of stress. On the Pacific coast, the strain is the monthly payment: 37% of mortgaged owners in California, Oregon and Washington spend 30% or more of their income on housing, compared with 28% in the Northeast, and Los Angeles reaches 43%. I expected that pattern to stretch inland from Colorado, but it doesn't. The Mountain states, Denver included, look much like the East Coast.

The East has its own pressures. New York City carries the heaviest owner cost burden of any major metro I looked at (46%), and the Northeast pays a larger share of income in property taxes than any other region. Move away from the coasts and a different risk takes over: thin equity. In the Midwest, 39% of 2025 conventional purchase loans left the buyer with less than 10% equity. On the Pacific coast, only 15% did.

[FIGURE 1: regional comparison. For each region (Pacific, Mountain, Northeast, South Atlantic, Midwest), show two values side by side: share of mortgaged owners paying 30%+ of income, and share of 2025 conventional loans above 90% CLTV. Caption: "Different regions are stretched in different ways."]

Seeing well-known cost-of-living patterns show up in the data was a useful first check that these measures capture something real. The more interesting result is that different regions are stretched in different ways, and, as the next section shows, those differences matter.

---

## What I built

An interactive map of every US county, with data layers grouped by the role each plays in mortgage risk:

- **Burden:** how much of household income goes to housing, both for existing owners and for people who bought in 2025.
- **Equity:** how many new loans leave buyers with less than 10% equity.
- **Outcome:** where serious mortgage delinquency sits compared with each county's own 2017–2019 normal.
- **Index:** two scores, burden and equity, that combine those measures against fixed 2019 benchmarks.

Selecting a county shows every measure side by side, so you can see what's driving its numbers.

Behind the map, a Python pipeline downloads federal data (Census surveys, CFPB delinquency data, 2025 mortgage loan records, Treasury insurance premiums), cleans and validates it, and writes small data files the page loads directly. A scheduled job reruns the pipeline weekly and republishes only when the source data changes. The map itself is built with D3.

[STACK LINE, small and muted: Python · DuckDB · D3 · TopoJSON · GitHub Actions · GitHub Pages]

---

## Decisions that shaped it

- **Missing data stays missing.** Counties without reliable data are hatched and labeled, not estimated.
- **Colors mean something.** Shading is tied to real benchmarks, like the standard that housing should take no more than 30% of income, rather than to rankings. A dark county is over a line, not just in the top seventh.
- **Payments are calculated loan by loan.** The new-buyer burden comes from each loan's actual amount, rate, term, taxes and insurance, divided by that borrower's income.

---

## Testing the index

The index is built on the "double trigger" theory of default: households usually default when they're stretched *and* hit by a shock, like a job loss. Before looking at any results, I wrote down a test: would counties with higher burden in 2019 see delinquency rise by 2023–2025?

They didn't. Higher-burden counties actually saw delinquency fall slightly more (rank correlation −0.16, across 499 counties). The diagnosis: delinquency fell almost everywhere in that period, so the test mostly measured how far each county had to fall. And 2019–2025 never delivered the second trigger. Unemployment stayed low, forbearance carried borrowers through 2020, and rising home prices gave owners an equity cushion.

Because that first test mostly measured where each county started, I added one more test, specified before running it: compare counties that began at the same delinquency level. The combined burden score still showed nothing. But its parts split in two. Thin equity was the strongest signal of any measure, followed by lower incomes and the share of applicants denied for carrying too much debt. The housing-cost measures, payment-to-income and the share of owners paying 30% or more, pointed the opposite way and canceled the others out.

[FIGURE 2: dot plot with 95% CI bars of the secondary-test partial correlations, one row per measure (Burden score, PTI, high-DTI share, DTI denial rate, owners paying 30%+, high-CLTV share, lower median income), sorted by value, with a vertical line at zero. Plain-language row labels. Caption: "Partial rank correlation with 2023–2025 delinquency, controlling for each county's 2017–2019 level. Bars are 95% bootstrap intervals."]

That fits the double-trigger theory better than my index did: what mattered was whether households had a cushion, not just how large the payment was. The Pacific coast is a good example, with the heaviest payment burden in the country and the least thin-equity lending. But this came from comparing seven measures after the fact, so I'm treating it as a lead for the next version of the index, not a conclusion. Testing that version honestly will take data I haven't seen yet.

So the map describes where households are stretched today. It doesn't forecast defaults, and I'd rather say that plainly than tune the index until it appears to.

---

## Who could use this

Mortgage brokers and lenders already use area-level data to size markets and focus outreach. A county-level view of burden shows where refinance options, first-time buyer programs and down-payment assistance would meet the most demand. Housing counselors and local governments could use the same view to see where support is likely to be needed before it shows up in delinquency numbers.

---

## What I learned

On the technical side, this was my deepest dive yet into how web graphics are built. An interactive map turns out to be many small components, each with one job: a projection that places counties on screen, a scale that turns numbers into colors, a data join that matches each county to its values. Each is simple on its own; together they make a working map.

The bigger lessons were about data. Quality assurance isn't a final step; it's most of the work. And combining mismatched sources is where the value is. None of these datasets says much on its own: a loan record doesn't know the borrower's taxes, and a Census survey doesn't know today's mortgage rates. Joined county by county, they describe something none of them could alone.

---

## How I built it

Like every project on this site, this one runs on a learning structure I set up deliberately. I use Claude Code for bulk programming, so the work moves quickly, while I own the spec, review every change, and make each design decision. Some things I keep for myself on purpose, like all git and version-control work, so I'm building real skills rather than just shipping output.

---

## What's next

Shock scenarios: sliders for income, insurance, taxes and rates that show how many counties would cross the burden line under each. After that, an AI layer: an MCP server that lets AI tools query any county's data and answer questions about it.

**Links row (repeat):** [Explore the live map] · [Methodology] · [GitHub repo]
