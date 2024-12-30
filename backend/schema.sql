
CREATE TABLE recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    cuisine_type VARCHAR(100) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    associated_moods TEXT NOT NULL,
    cooking_time INTEGER NOT NULL,
    difficulty VARCHAR(50) NOT NULL,
    serve_size INTEGER NOT NULL
);


INSERT INTO recipes (name, cuisine_type, ingredients, instructions, associated_moods, cooking_time, difficulty, serve_size) VALUES 
('Comforting Mac and Cheese', 'American', '1 pound macaroni,4 cups cheddar cheese,2 cups milk,4 tbsp butter,1/4 cup flour,Salt and pepper', '1. Cook macaroni according to package\n2. Make cheese sauce with butter flour and milk\n3. Add cheese and stir until melted\n4. Combine with pasta', 'stressed,sad', 30, 'Easy', 6),
('Fresh Summer Salad', 'Mediterranean', 'Mixed greens,Cherry tomatoes,Cucumber,Olive oil,Lemon juice,Fresh herbs', '1. Wash and chop vegetables\n2. Mix with olive oil and lemon juice\n3. Add fresh herbs and toss', 'happy,relaxed', 15, 'Easy', 4),
('Energizing Smoothie Bowl', 'Health', 'Banana,Mixed berries,Greek yogurt,Honey,Granola,Chia seeds', '1. Blend fruits with yogurt\n2. Pour into bowl\n3. Top with granola and seeds', 'happy,excited', 10, 'Easy', 1),
('Spicy Thai Curry', 'Thai', 'Coconut milk,Curry paste,Vegetables,Rice,Protein of choice,Spices', '1. Saute curry paste\n2. Add coconut milk and simmer\n3. Add vegetables and protein\n4. Serve with rice', 'stressed,excited', 45, 'Medium', 4),
('Chocolate Lava Cake', 'French', 'Dark chocolate,Butter,Eggs,Sugar,Flour,Vanilla', '1. Melt chocolate and butter\n2. Mix with other ingredients\n3. Bake until edges are set', 'sad,relaxed', 25, 'Medium', 2);