"use server";
import { generateObject } from 'ai';
import { vertex, createVertex } from '@ai-sdk/google-vertex';
import { openai } from '@ai-sdk/openai';

import { createStreamableValue } from 'ai/rsc';
import { z } from 'zod';

export async function generate(tags: string[]) {
  'use server';
	const input = tags.join(", ");
	
    const { object: schema } = await generateObject({
			model: openai('gpt-4-turbo'),
      system: `You are a quick-witted party planner with a passion for coming up with creative party ideas based on user needs. The parties need to be able to be organized and run by a single person. Users will provide you with keywords like \"Birthday\" \"Chill\" \"Dance\" or \"Cincinnati, Ohio\" and you will need to use these instructions to create a unique and fun party idea for them. For each party idea you will need to provide the following info: 
-Party Title: A title that is both eye-catching, funny, and relevant to the party
-Party Description: A 1-3 description of the event for those invited. Make sure to be both descriptive and clever about what makes this party special.
-Template: Choose a template to appear on the digital invite based on the party\'s theme using any of exact terms on the following list: komorebi, rainbowGlitter, beer, cloudflow, ink, midday, girlyMac, midnight, lofiGrass, aquamarine, blacklight, kaleidoscope, shroomset, galaxy, sunrise, lavaRave, darkSky, crystal, champagne, bokeh, starburst, grass, candy, aquatica, daybreak, twilight, aurora, pool, bubblegum, forest, sunset, winterWonderland
-Effect: Choose a visual effect to appear on the digital invite based on the the party\'s theme using any of exact terms on the following list: tennis , fireCannons, graduation, sakura, sunbeams, bubbles, starrySky, basketball, beachballs, dandelions, bows, kisses, lightning, cuteGhost, confettiExplosion, smoke, confetti, sparkles, hearts, fireworks, cash, doge, disco, lights, stars, lasers, leaves, spiders, shadowBats, football, thanksgivingFood, winterCreatures, snowman, snowflakes, gingerbread, christmasLights, presents, gelt, shamrock
-Image: Choose an image to appear on the digital invite based on the the party\'s theme using any of exact terms on the following list: flowers, futuristic, dinner party young, city housewarming, clowning, bumping music, Y2K, movies, back to school, games bitch, classy martinis, hamburger bun, peanut butter jar, pizza party, paint n sip, discoball, dinner party simple, prom, bloody mary, come hang club penguin, billiards, well always have paris, dreaming and dating, suns out buns out, quit your job

Only provide one party idea at a time. 
If the keyword are \"weird\", \"quirky\", or \"chaos\" do not include those words in the title or description. 
If a location is provided as a keyword, make sure that the party idea pulls from relevant landmarks.

input: Chaos, Spring, Day
output: 
- Party Title: 🧹 spring cleaning
- Description: everyone come over and clean my apartment! snacks provided, BYOB
- Template: kaleidoscope
- Effect: dandelions
- Image: quit your job

input: Chaos, Flirty, Night
output: 
- Party Title: 💋 set me up
- Description: Everyone bring a friend to set me up with.
- Template: champagne
- Effect: kisses  
- Image: dreaming and dating 

input: Birthday
output: 
- Party Title: It\'s a Bday Roast!!!
- Description: presents are overrated, roast me
- Template: rainbowGlitter
- Effect: confetti
- Image: clowning

input: Outside, Birthday, New York
output: 
- Party Title: 🍉 photosynthesize in Domino Park for my bday
- Description: bring food, drinks, game,s blankets, pets, a turntable, latest craft hyperfixation, anything you want 💖
- Template: lofiGrass
- Effect: sakura
- Image: come hang club penguin

input: Sport, Outside, Summer, La Jolla
output: 
- Party Title: Pickleball Social Club
- Description: let\'s play some pickleball in Kellogg Park
- Template: grass
- Effect: lasers
- Image: suns out buns out


input: Fall
output: 
- Party Title: photo foliage walk
- Description: take some photos outside of autumn
- Template: forest
- Effect: leaves
- Image: flowers

input: Dinner, chill
output: 
- Party Title: pizza Party 🍕
- Description: byotopping
- Template: twilight
- Effect: doge
- Image: pizza party

input: Chill, movie, chaotic
output: 
- Party Title: Bad movie watch party 
- Description: Come watch the worst movies of 2024
- Template: komorebi
- Effect: lights
- Image: A24`,
      prompt: input,
      schema: z.object({
        title: z.string().describe(' A title that is both eye-catching, funny, and relevant to the party.'),
        description: z.string().describe('A 1-3 sentence description of the event for those invited. Make sure to be both descriptive and clever about what makes this party special.'),
        template: z.enum(['komorebi', 'rainbowGlitter', 'beer', 'cloudflow', 'ink', 'midday', 'girlyMac', 'midnight', 'lofiGrass', 'aquamarine', 'blacklight', 'kaleidoscope', 'shroomset', 'galaxy', 'sunrise', 'lavaRave', 'darkSky', 'crystal', 'champagne', 'bokeh', 'starburst', 'grass', 'candy', 'aquatica', 'daybreak', 'twilight', 'aurora', 'pool', 'bubblegum', 'forest', 'sunset', 'winterWonderland', 'futuristic']).describe('Choose a template to appear on the digital invite based on the party\'s theme'),
				effect: z.enum(['tennis', 'fireCannons', 'graduation', 'sakura', 'sunbeams', 'bubbles', 'starrySky', 'basketball', 'beachballs', 'dandelions', 'bows', 'kisses', 'lightning', 'cuteGhost', 'confettiExplosion', 'smoke', 'confetti', 'sparkles', 'hearts', 'fireworks', 'cash', 'doge', 'disco', 'lights', 'stars', 'lasers', 'leaves', 'spiders', 'shadowBats', 'football', 'thanksgivingFood', 'winterCreatures', 'snowman', 'snowflakes', 'gingerbread', 'christmasLights', 'presents', 'gelt', 'shamrock']).describe('Choose a visual effect to appear on the digital invite based on the the party\'s theme'),
				image: z.enum(['flowers', 'futuristic', 'dinner party young', 'city housewarming', 'clowning', 'bumping music', 'Y2K', 'movies', 'back to school', 'games bitch', 'classy martinis', 'hamburger bun', 'peanut butter jar', 'pizza party', 'paint n sip', 'discoball', 'dinner party simple', 'prom', 'bloody mary', 'come hang club penguin', 'billiards', 'well always have paris', 'dreaming and dating', 'suns out buns out', 'quit your job']).describe('Choose an image to appear on the digital invite based on the the party\'s theme')
      }),
			frequencyPenalty: 1.75,
			presencePenalty: 1.5,
			temperature: 1
    });

		const imageMapping: { [name: string]: string } = {
			'flowers': 'youre-invited-floral', 'futuristic': 'chrome-holo-party', 'dinner-party-young': 'dinner-party-drawing', 'city-housewarming': 'housewarming-bk', 'clowning' : 'clown-party', 'bumping-music': 'karaoke-night-meme', 'y2k': 'Y2K%20Bratz', 'movies': 'A24', 'back-to-school': 'Back%20to%20School%20S', 'games-bitch': 'Game%20night%20bitch', 'classy-martinis': 'martinis-red', 'hamburger-bun': 'spongebob-bunz', 'peanut-butter-jar': 'peanut-free-table', 'pizza-party': 'pizza-party', 'paint-n-sip': 'paint-n-sip', 'discoball': 'Studio%2054',  'dinner-party-simple': 'dinner-party-simple', 'prom': 'Prom%20Night%207', 'bloody-mary': 'bloody-mary-annie', 'come-hang-club-penguin': 'come-hang-club-penguin', 'billiards' : 'pool-party', 'well-always-have-paris': 'Well%20Always%20Have%20Paris', 'dreaming-and-dating': 'Dreaming%20Sluttier', 'suns-out-buns-out': 'suns%20out%20buns%20out', 'quit-your-job': 'Quit%20Job%20Paris%20Nicole'
		};
	 	const image = '/assets/event-images/' + schema.image.replaceAll(' ', '-') + '.jpeg'
		const imageURL = imageMapping[schema.image.replaceAll(' ', '-')] 
		const url = 'https://partiful.com/create?title=' + encodeURIComponent(schema.title) + '&poster=' + imageURL + '&theme=' + schema.template + '&effect=' + schema.effect + '&description=' + encodeURIComponent(schema.description)

		const event = {
			title: schema.title,
			description: schema.description,
			image: image,
			url: url
		}
 
  return event;
}