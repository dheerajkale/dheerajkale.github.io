export default function About() {
    return (
        <div className="min-h-screen w-screen bg-white text-black flex flex-col items-center justify-center ">

            <div className="flex flex-col lg:flex-row items-center justify-center text-lg max-w-10/12 mx-auto">
                {/* Image section */}
                <div className="flex items-center justify-center w-full lg:w-1/3 ">
                    <div className="relative overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                {/* Text section */}
                <div className="flex flex-col gap-3 px-5 py-12 justify-center align-middle w-full lg:w-2/3 text-3xl lg:text-lg max-w-9/12">
                    <p>
                        With nearly three decades of experience in Advertising and Corporate Communications,
                        I bring a rare blend of creativity and professionalism to everything I do. My creativity stems from
                        my advertising background, while years of navigating the corporate landscape have instilled in
                        me a strong sense of professionalism, discipline, and strategic thinking.
                    </p>

                    <p>
                        Over the course of my career, I have mastered the finer nuances of communication across Print,
                        Digital, Outdoor, and Electronic Media. My journey has given me the opportunity to wear many hats—from
                        Copywriting and Client Servicing to Media Planning, Vendor Liaison, Marketing Strategy, and Brand Building.
                        Each role has enriched my perspective and strengthened my ability to deliver impactful communication solutions.
                    </p>

                    <p>
                        Today, as a seasoned and versatile leader, I continue to embrace learning with the same enthusiasm
                        that has driven me throughout my career. I believe that every new challenge presents an opportunity to grow, innovate,
                        and create meaningful value.
                    </p>
                </div>

            </div>
        </div>
    );
}
