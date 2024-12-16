"use client"
import React, { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { generate } from "@/app/actions";
import { BioContext } from "@/context/BioContext";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

const FormSchema = z.object({
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export function UserInput() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tags: ["summer", "birthday"],
    },
  })

	const { setTitle, setDescription, setImage, setURL, setItems, items, setLoading } = useContext(BioContext);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setLoading(true);

    try {
			const randomTags = "Machine,Magazine,Mail,Main street,Toothbrush,Dentist,Majorette ,Make,Mall,Man,Manager,Manufacture,Map,Map Making,March,Marching,Mark,Market,Dumb Marketing,Marriage,Match,Mate,Material Sciences,Math,Matter,Dark Matter,Maximum Overdrive,Maybe,Meal,Meat,Media,Med School,Medicine,Medium article,Mediums,Meet-cute,Meeting,Stand-up Meeting,Members-only,Yacht,Hot tub ,Cruise,Memory,Menu,Create-your-own,Choose-your-own Adventure,Mess,Messhall,Message,Massage,Metal,Method Soap,Middle,Midnight,After Midnight,Milk,Chocolate Milk,Mind,Mindmeld,Mine,Mime,Minimum Wage,Minor,Minute,Mirror,Miss Maple,Mission,Mistake,Mix,Mixed Drink,Mixology ,Mixture,Mobile,Mode,Model,Modeling,Mom,Moment,Monument,Money,Baby Monitor,Month,Mood,Mood Ring ,Morning,Morning run,Mortgage,Most,Mother,Mother May I,Mickey Mouse,Goofy,Motor,Mountain,Mountain hike ,Mouse,Mouth,Moving day ,Movie,Movies,Mud,Muscle,Muscle Beach ,Music,Musical,Musical Theater,Wicked,Music Man,Band,Lab,Labrador Retriever,Ladder,Lady,Lake,Tubing,Lakehouse,Land,Landart ,Darts,Landscaping,Languages,Laugh,Law,Lawyer,7 Layer cake,Follow the Leader,League,Rec league ,Championship,Finale,Pleather,Leather,Leaves,Fall leaves,Weird Lecture,Leg,Leghair ,Waxing,Length,Lesson,Letter,Love letter,Level,Library,Lie,Life,Lift,Light,Limit,Line,Link and Zelda,Lip,Lists,Listen,Literature,Living,Loading Icon,Loan Shark ,Local cuisine,Local Favorite,Lock,Log,Log cabin,Long,Look,Lookbook,Photoshoot,Lose,Love,Love life,Love of your life,Limbo,Luck,Lucky charms,Lunch,Lunchbox ,Ice,Ice cream,Icecream ,Idea,If,Museum,Image,Imagination,Impress,Impressions,Improv,Improv Jazz,Home Improvement,Incident,Increase,Independence,Independence Day,Independent Woman,Enemy,Enemies List,Inflation,Influence,Information,Injury,Insect,Inside,Inspection,Poker,Fireworks,Interactive Technologies,International,Internet,AI ,Artificial Intelligence ,Internet Party,LAN Party,Interview ,Interview with a Vampire,Introduction,Dumb Investments,Invite,Evite,Iron,Island,It,Item,Gains,Game,Tabletop Games,Role Playing Games,LARP,The Gap,Garage,Garage Music,Garbage,Community Garden,Garden,Gas station,Gate,Hunters and Gathers,Gear,Gene Hackman,General,Gift,Grift,E-Girl,Girlfriend,The Giver,Glad Trash bags,Glass,Glass blowing,Glasses,Glove,Go,Goalie,Gold,Golf,Good,Good soup,Government,Grab and Go,Gatorade,Grand ball,Grandfather,Grandmother,Dancing,Dance party ,Grass,Great,Green,Grocery shopping,Ground,Group,Growth,Guard,Guess,Guess who,Guests,Guidance counselor,Guide,Guided tour,Guitar,Weird Guy,Face,Fear Factor,Fantasy Football,Fact,Factor,Fail,Failure,Fall,Waterfall,Familiar,Family,Fan,Fanny,Farm,Farmer,Fat,Father,Vault,Feature Film,Fee,Feed,Feedback,Feel,Feeling,Foodfight ,Field,Fight,Figure,File,Fill,Film,Finals,Finance bros,Finding,Finger,Finish,Finnish ,Fire,Firepit,Fire dancing,Fish,Fishing,Fixer upper,Flight,Floor,Flow,Flower,Flowers,Flower Picking ,Fly,Horsefly ,Focus,Meditation,Folding laundry,Follower Count,Food,Foodhall,Potluck,Foot,Football,The Force,Forever,College Formal,Fortune teller,Fortune 500,Foundation,Frames,Freedom,Friend,Friendship,Best Friend,Final Fantasy,Front,Fruit,Fruit snacks,Fuel,Fun,Function,Funeral,Funny,Future,Habit,Hair,Half,Two and a Half Men,Hall,Hand,Handheld,Holding Hands,Handle,Hat,Hate,Head,Healthcare,Heart,Heat,Heavy weights,Height,Hell,Hellhole,Hello,Help,Hide,High,Miller High Life,Highlight,Highway,Hire,Historian,History,History Channel,Hit,Hold,Hole,Holiday,Holidays,Holiday tradition,Home,Homework,Housewarming,Housecooling,Honey,Honeybadger,Hook,Hookey ,Hope,Horror,Horror Movie,Horse,Horseback riding,Hospital,Host,Hotel,Hotel,Hour,House,Human,Hunt,Hurry up and wait,Husband,Axe throwing,Nail,Name,Nasty,Seven Nation Army,National Anthem,Native Plants,Natural Wine,Nature,Nature Park,Neatfreak ,Unnecessary ,Neck,Negative test,Negative,Negotiation,Nerve,Net,The Brooklyn Nets,Network TV,News,Newspaper,Night of the Living Dead,Nobody,Noise,Noisy,Normal,North,The North Face,Nose,Secret Notes,Nothing,Novel,Novella,Number,Nurse,Object permanence,Objective,Obligatory,Occasional,Offer,Office,Officer,Official,Oil,One,Opening,Operation,Opinion,Onion,Orangutan ,Opposite Day,Optional,Orange,Orange juice,Order of the Secret Swan,Ordinary,Original,Other,Outcome,Outside,The Outsiders,Oven,Kangaroo,Keepsake,Key,Kick,Kickboxing,Kid,Killing Eve,Kind,Acts of Kindness,King,Kiss,Kitchen,Kitch,Knitting,Knockout,Knee,Knife,Knowledge,Jacket,Steve Jobs,Job,Bad Joints,Juniper,Jake ,Jade,Jelly ,Jetplane ,Joke,Judge,Juice,Jump,Junior,Jury,Pace,Pack ,Ratpack,Package,Page,Pain,Paint,Painting,Pair,Panic,Panic at the Disco!,Paper,Rock Paper Scissors,Parenting,Park,Park Day,Park Tournament,Parking,Partner,Pink,Barbie Party,Priority Pass,Passage,Passenger princess,Passion,Past,Path,Patience,Patient,Pattern,Pause,Paypal,Payment,Peace,Peak,Mountain Peak,Pen,Penalty,Pension,Perception,Performance,Period,Parking Permit,Person,Personal,Personality,Personality Test,Perspective,Moon Phase,It’s not a Phase,Philosophy,Philosophical Debate,Phone,No Phone,Photo,Phrase,Physical,Physics,Piano,Puck,Pick,Picture,Photography,Photos,Pie,Pumpkin Pie,Reeses Pieces,Pin,Safety Pins,Pipe,Pitch,Pizza,Secret Place,Plan,Planes,Plant,Plants,Plastic,Plate,Platform Game,Play,Venmo,Playroom,Playplace,Board Games,Mp3 Player,Pleasure,Plenty,Poem,Poetry,Points,Pollution,Pool,Pool Party,Pop,Pop music,Pop Punk ,Pose,Soda Pop,Yoga Pose,Positive Test,Positive Thinking,Spiritual Possession,Possibility,Post,Pot,Pot roast,Potato,Potato Chip,Pound Town,Power,Practice,Practice Trumpet,Doomsday Prepper,Premonition,Escape Room,Presents,Presentation,Powerpoint,President,Press,The Press,Under Pressure,The Price is Right,Pride and Prejudice,Pride,Seven Deadly Sins,Primary,Primate,Principal,Print,Pint,Priority,Private eye,Private,Prize,Math Problem,Procedural Drama,Veggie Produce,Product,Profession,Professor,Profile,Programming,Project,Promise,Promotion,Essay Prompt,Proof,Property,Proposal,Protection,Psychology,Psychoanalysis,Public Restroom,Pull,Punch,SUNY Purchase,Purple,Purple Carrot,Purpose,Push,Put,Putput ,Race,Racecar,Radio,Radiolab,Rain,It’s Raining Men,Raisin,Raise,Free-Range,Rate from 1-10,Ratio,Raw,Raw Eggs,Reach,Read,Reading ,Book club,Virtual Reality,Reception,Receptionist,Recipe,Recipe Book,Favorite Recipe,Recognize,Recommend,Recorder,Record music,Recording,Recover,Red,Reference,Reflection,Refrigerator,Refuse,Recycle,Recycling,Regional accent,Regional Cuisine,Register,registry,Regret,Regular,Relationship,Relative,Release ,Relief,Remote,Remove,Rent,Rent the musical,Repair,Repeat,Replacement,Reply All,Congressional Representative,Reputation,Reputation by Taylor Swift,Request,Research,Reserve,Resident,Resistance,New Years Resolution,Vacation Resort,Natural Resources,Respect,Respect by Aretha Franklin,Responsibility,Rest,Rest Stop,Restaurant,Result,Return,Reveal,Retinue,Review,Revolution,Reward,Rice,Rich,Ride,Ring,Rip,Risk,River,Road,Rock,Roll,Roof,Room,Rope,Rough,Round,Routine,Rowing ,Royal,Rub,Ruins,Rule,Run,Running Club,Run a Marathon,Rush,Rush Hour,Rush Hour 3,Murder Mystery,Sad,Sad girl,Safe,Safety,Sailing,Salad,Sale,Salt,Sample,Sample Sale,Sand,Sandwich,Savings,Scale,Scaley,Scene,Schedule,Scheme,School,Science,Score,Scratch,Screen,Sunscreen,Screw,Script,Sea,Search,Season,Hot Seat,Second Place,Secret,Secretary of State,Sectional,Sector,Security Guard,Self,Subconscious,Sell,Senior Year,Senior Citizen,Senses,6th Sense,Sensitive,Sentence,TV Series,Serve,Service,Therapy Session,Film Set,Setting,Weird but Sexy,Shake your booty,milkshakes,Shapes,Share,Stocks,Shelter,Shift,Sunshine,Ship,Shirt,Shock,Shoe,Shoot,Shoot your Shot,Shooting Range,Shopping,Shoulder,Show,Shower,Sick,Side,Signs,Signal,Significance,Silly,Silver,Simple,Singing,Karaoke,Single,Singles Party,Sink,Knight,Sister,Website,Situation Room,Size,Skill,Skin,Skirt,Maxi skirt,Sky,Sleep,Sleepover,Sleepytime Tea,Slice,Pizza Slice,Slide,Slip,Smelly,Smells,Perfume,Smile,Smokeless Grill,Smoke,Snow,Snowshoe,Ski,Snowboard,High Society,Sock,Mismatched sock,Soft,Software,Soil,Solid,Somewhere Out there,Son,Song,Sorting hat,Sound,Soup,Source,South,Sneak,Snoop,Snoopy,Snapping,Snatched,Space,Space race,Spaceship,Spare tire,Speaker,Sneaker,Special,Specialist,Speech,Speed,Spell,Magic Spell,Seance,Spirit,Spiritual,Spite,Split,Sport,Sports Tournament,Spot,Spray,Seaspray,Spreads,Spring,Picnic,Square,Stable,Staff,Stage,Stand,Standard,Star,Start,State,Skate ,Ice Skate,Skateboard,Bus station,Stay,Steak,Steal,Stepbrother,Stick,Stomach,Stop,Storage unit,Stores,Storm,Thunderstorm ,Story,Storytime,Pasta Strainer,Stranger,Stranger things,Strategy games,Street,Street style,Streetwear,Strength contest,Stress,Stretch,Strike,String,String theory,Struggle,Student,Studio Apartment,Dance studio,Art Studio,Study,Stuff,Stupid,Style,Styling,Stylish,Substances,Success,Suck,Sugar,Suggestions,Suit,Summer,Sun,Supermarket,Support Group,Surgery,Knee Surgery,Nose Surgery,Surprise,Surprise Party,Surround Sound,Survey,Suspects,Sweet,Swim,Swimming,Swing,Switch,Sympathy,Symphony,Hotbox,Table,Tackle,Tale,Tail,Talk,Talk show,Shark Tank,Tap Dance,Tag,Target,Taste,Taxes,Tea party,Teach,Teacher,Team,Sports Team,Tears,Technology,Telephone,Television,High Temperature,Low Temperature,Temporary,Tennis,Tension,Term,Test,Texting,Thanks,Themed,Theory,Thing,Thought,Throat,Ticket,Tie,Time,Tips,Title,Today,Toe,Tomorrow,Tone,Tongue,Tonight,Tool,Tooth,Top,Hot Topic,Totally Spies,Touch,Tough,Tour,Tourist,Towel,Tower,Town,Track,Trade,Weird Tradition,Traffic,Train,Training,Transition,Transportation,Trash,Travel,Treat,Tree,Trick,Trip,Triple Chocolate,Trouble,Truck,Trust,Truth,Tune,Turn,Twist,Twister,Two,Twink,Thumb War,Abroad,Access,Accident,Account,Action,Active,Actor,Ad,Addition,Administration,Adult,Advance,Advantage,Advertising,Advice,Affair,Affect,Afternoon,Age,Agency,Agent,Agreement,Air,Airline,Airport,Alarm,Alcohol,Alien,Alternative,Ambition,Amount,Analyst,Anger,Angle,Animal,Annual,Answer,Anxiety,Anybody,Anything,Anywhere,Apartment,Appeal,Appearance,Apple,Application,Appointment,Area 51,Argument,Arm,Army,Art,Articles,Ask,Astrology,Assistant,Associate,Assumption,Atmosphere,Attack,Attempt,Attention,Attitude,Audience,Author,Average,Award,Awareness,Baby,Backs,Background,Bad,Bag,Bake,Balance,Ball,Band,Bank,Bar,Base,Baseball,Basket,Bat,Bath,Bathroom,Battle,Beach,Bear,Beet,Beautiful,Bed,Bedroom,Beer,Bell,Belt,Belch,Bench,Bend,Benefit,Betting,Beyond,Bicycle,Big,Bike,Bill,Bingo,Bird,Bite,Bitter,Black,Blame,Blank,Blind,Block,Blood,Bloody Mary,Blow,Blue,Board,Boat,Body,Bones,Bonus,Book,Boot,Border,Boss,Bottles,Bottom,Bounce House,Bowl,Box,Boyfriend,Brain,Branch,Brave Little Toaster,Bread,Break,Breakfast,Breath,Brick,Bridge,Brilliant,Broad,Brothers,Brown,Brouhaha,Brush,Brunch,Buddy,Budget,Bugs,Building,Burn,Bus,Business,Button,Butts,Buy,Cabinet,Cable,Cake,Calendar,Call,Calm,Camera,Camp,Campaign,Cans,Candle,Candy,Cap,Capital,Car,Card,Care,Career,Carpet,Case,Cash,Cat,Cats,Kittens,Catch,Celebration,Cells,Cellphone,Chain,Chair,Championship,Chance,Change,Channel,Chapter,Character,Charge,Charity,Check,Cheek,Chemistry,Chest,Chicken,Child,Childhood,Chips,Chocolate,City,Classic,Climate,Clock,Closet,Clothes,Cloud,Club,Clue,Coach,Coast,Coat,Code,Coffee,Cold,Collar,Collection,College,Combination,Comfortable,Comment,Commercial,Community,Competition,Complaint,Computer,Concert,Condition,Confusion,Construction,Contest,Contract,Contribution,Control,Conversation,Cook,Cookie,Copy,Compost,Count,Couple,Court,Cousin,Clock,Crows,Cow,Cowboy,Cracks,Craft,Crash,Crazy,Cream,Creative,Criticism,Cry,Culture,Cups,Currency,Curve,Cut,Cycle,Dads,Damage,Dancing,Dare,Dark,Data,Date,Dating Show,Day,Dead,Deal,Dealer,Deer,Debate,Debt,Decision,Deep Sea,College Degree,Delivery,Department Store,Depression,Design,Desires,Desk,Devices,Devil,Diamonds,Diet,Dig,4th Dimension,2D,3D,Dinner,Dirt,Disaster,Discount,Discussion,Dishes,Disk,District,Doctor,Document,Dog,Dogs,Puppies,Door,Dots,Double,Doubt,Draft,Fantasy Draft,Drag,Drag show,Drama,Draw,Dream,Dress,Drink,Drive,Drop,Drunk,Drunken,Dump,Dust,Duty,Ear,Earth,Easy,East,Eat,Eating,Economy ,Edge,Edginng,Editing,Educational,Egg,Election,Elevator,Emergency,Emotion,Employment,Endings,Energy,Enron,Engine,Engineer,Entertainment,Entrance,Environment,Environmental Crisis,Equal,Equipment,Error,Escape,Essay,Establishment,Estate,Estimate,Evening,Event,Evidence,Exam,Examination,Example,Exchange,Excitement,Excuse,Exercise,Exit,Experience,Expert,Explanation,Expression,Extension,Extent,External,Extreme,Eye,Quality,Quarter,Queen,Question,Quiet,Quiet Quit,Quit,Quote,Quest,Uncle,Unique,University,Upper,Upstairs,Use,User,User Manual,Usual,Vacation,Valuable,Vegetable,Vehicle,Video Set,Video Rental,Video Shoot,Views,Village,Visit,Visual Arts,Voice,Volume,Wake,Walk,Walls,War,Wave,Warning,Wash,Wasp,Watch,Watch party,Water,Weakness,Wealth,Wear,Weather,Weaving,Web,Wedding,Workweek,Weekend,Weight,Weird,Welcome,West,Weed,Wheel,White,Whole,Wife,Will,Wind,Window,Wine,Wing,Winner,Winter,Wish,Witness,Woman,Wonder,Wood,Word,Work,World,Worry,Worth,Wrap,Hip-hop,Writing,Yak,Yam,Yard,Yarn,Yawn,Yeast,Yellow,Yield,Yoga,Yolk,Youth,Yoyo,Yacht,Yodel,Yen,Yesterday,Zebra,Zenith,Zigzag,Zinc,Zipper,Costume,Zodiac,Zombie,Zone,Zoo,Zoom,Zucchini,Zoboomafoo,Laundromat,Confusing,Spatangus,werewolf"
			const randomTagsArray = randomTags.split(',')
			const randomTag = randomTagsArray[Math.floor(Math.random() * randomTagsArray.length)];
			const tags = [...values['tags'], randomTag]
      const object = await generate(tags);
			setTitle(object.title)
			setDescription(object.description)
			setImage(object.image)
			setURL(object.url)
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
		const i = Math.floor(Math.random() * 8) + 1;
		const background = "url('/assets/backgrounds/frame-" + i + ".png')";
    document.body.style.backgroundImage = background
		if (i > 6) {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
		}
		
  }

  function addTag(e: any) {
		let input = document.querySelector('.add-vibe') as HTMLInputElement
		let value
		if (input) {
			value = input.value  ?? ''
		}
		if (value) {
			setItems([...items, {'id': value, 'label': '🫵 ' + value, 'checked': true}])
			let formVals = [...form.getValues().tags, value]
			form.setValue('tags', formVals, {
				shouldValidate: true
			})
		}
		input.value = '';
	}
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-center m-auto max-w-4xl" id="partiful-tags">
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="tags"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
												id={`${item.id}-checkbox`}
                        className='inline-flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl className="flex gap-x-2">
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={(checked: boolean) => {
															item.checked = !item.checked
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  )
                            }}
														title={item.label}
                          />
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />
              ))}
							<div className="relative">
							<Input key='input' tabIndex={0} className="add-vibe .px-6 cursor-pointer rounded-[100px] border border-transparent text-black transition-colors duration-200 ease-in-out text-center" placeholder="🫵 add vibe..."></Input>
							<button className="add-vibe-submit" type="button" onClick={(e) => addTag(e)}>➕</button>
							</div>
              <FormMessage className="w-full"/>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default UserInput;
