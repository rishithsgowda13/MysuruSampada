import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        // Common
        save: "Save",
        cancel: "Cancel",
        loading: "Loading...",
        back: "Back",
        logout: "Log Out",

        // Home
        hero_title: "Explore the Crafts of Mysuru",
        hero_subtitle: "Find master artisans, book workshops, and bring home more than just a souvenir.",
        start_journey: "Start Your Journey",
        search_placeholder: "Search crafts...",

        // Navigation
        explore: "Explore",
        map: "Map",
        login: "Login",
        join_now: "Join Now",

        // Categories
        all_crafts: "All Crafts",
        sandalwood_carving: "🌿 Sandalwood Carving",
        silk_weaving: "🧵 Silk Weaving",
        mysore_painting: "🎨 Mysore Painting",
        traditional_pottery: "🏺 Traditional Pottery",
        incense_making: "🔥 Incense Making",
        stone_sculpture: "🗿 Stone Sculpture",

        // Login
        welcome_back: "Welcome Back",
        login_subtitle: "Login to continue your journey",
        identifier_label: "Email or Phone Number",
        password_label: "Password",
        forgot_password: "Forgot Password?",
        login_btn: "Log In",
        no_account: "Don't have an account?",
        create_account_link: "Create new account",

        // Signup
        create_account_title: "Create Account",
        full_name_label: "Full Name",
        email_label: "Email Address",
        phone_label: "Phone Number",
        verify_details: "Verify Details",
        google_sign_up: "Sign up with Google",
        verify_contact: "Verify Contact Info",
        otp_subtitle: "Enter OTPs sent to your email and phone",
        email_otp: "Email OTP",
        phone_otp: "Phone OTP",
        verify_both: "Verify Both",
        secure_account: "Secure your Account",
        create_password: "Create Password",
        confirm_password: "Confirm Password",

        // User Dashboard
        hello: "Hello",
        ready_explore: "Ready to explore Mysuru?",
        explore_mysore: "Explore Mysore",
        explore_desc: "Discover hidden gems and cultural heritage.",
        trip_planning: "Your Travel Agent",
        trip_desc: "Curate your perfect Mysore itinerary.",
        trips: "Trips",
        trips_desc: "Manage your upcoming and past journeys.",
        google_maps: "Google Maps",
        maps_desc: "Navigate the city with ease.",
        saved_places: "Saved Places",
        bucket_empty: "Your bucket list is empty. Start exploring!",
        recent_trips: "Recent Trips",
        no_recent: "No recent activity found.",

        // Settings
        settings_title: "Settings",
        appearance: "Appearance",
        light_mode: "Light Mode",
        dark_mode: "Dark Mode",
        app_language: "App Language",
        edit_profile: "Edit Profile",
        security: "Security",
        change_password: "Change Password",
        old_password: "Old Password",
        new_password: "New Password",
        confirm_new_password: "Re-enter New Password",
        update_password: "Update Password",
        delete_account: "Delete Account",
        delete_confirm_text: "Once you delete your account, there is no going back. Please be certain.",
        enter_password_confirm: "Enter Password to Confirm",

        // Admin Dashboard
        admin_console: "Admin Console",
        platform_overview: "Platform Overview",
        system_configuration: "System Configuration",
        dashboard: "Dashboard",
        total_users: "Total Users",
        total_partners: "Total Partners",
        users_directory: "Users Directory",
        search_users: "Search users...",
        name: "Name",
        email: "Email",
        phone_number: "Phone Number",
        partners_directory: "Partners Directory",
        export_csv: "Export CSV",
        establishment_name: "Establishment Name",
        contact_email: "Contact Email",
        admin_profile: "Admin Profile",
        admin_email: "Admin Email",
        admin_phone: "Admin Phone",
        save_changes: "Save Changes",
        system_controls: "System Controls",
        maintenance_mode: "Maintenance Mode",
        maintenance_desc: "Disable access for all non-admin users.",
        global_broadcast: "Global Broadcast",
        broadcast_placeholder: "Type urgent message for all users...",
        send: "Send",
        logout_admin: "Log Out Admin Session",

        // Explore Page
        explore_mysuru: "Explore Mysuru",
        choose_experience: "Choose what you want to experience",
        famous_places: "Famous Places",
        famous_places_desc: "Popular tourist spots",
        hidden_gems: "Hidden Gems",
        hidden_gems_desc: "Unexplored spots",
        hotels: "Hotels",
        hotels_desc: "Comfortable Stays",
        local_food: "Local Food",
        local_food_desc: "Authentic Mysore delicacies",
        culture: "Culture",
        culture_desc: "Heritage & Traditions",
        artists: "Artists",
        artists_desc: "Local Art & Crafts",

        // Trip Planning Page
        trip_planner: "Your Travel Agent",
        who_travelling: "Who are you travelling with?",
        how_long_stay: "How long is your stay?",
        ai_curated: "AI Curated Itinerary",
        family: "Family",
        friends: "Friends",
        couple: "Couple",
        solo: "Solo",
        enter_duration: "Enter Duration",
        number_of_days: "Number of Days",
        generate_plan: "Generate Plan",
        curating_trip: "Curating the perfect {type} trip...",
        top_recommendations: "Top Recommendations for {days} Days",
        make_own_plan: "Make Your Own Plan",
        customize_journey: "Customize every detail of your journey",

        // Places List Page
        touristy_must: "Touristy Must-Dos",
        offbeat_local: "Offbeat & Local",
        get_directions: "Get Directions",

        // Forgot Password Page
        verify_otp: "Verify OTP",
        reset_password: "Reset Password",
        enter_email_phone_otp: "Enter your email or phone to receive an OTP",
        enter_code_sent: "Enter the 4-digit code sent to {identifier}",
        create_new_password: "Create a new strong password",
        email_or_phone: "Email or Phone",
        send_otp: "Send OTP",
        enter_otp: "Enter OTP",
        verify_code: "Verify Code",
        resend_otp: "Resend OTP",
        reset_password_btn: "Reset Password"
    },
    hi: {
        // Common
        save: "सहेजें",
        cancel: "रद्द करें",
        loading: "लोड हो रहा है...",
        back: "पीछे",
        logout: "लॉग आउट",

        // Home
        hero_title: "मैसूरु की कलाओं का अन्वेषण करें",
        hero_subtitle: "मास्टर कारीगरों को खोजें, कार्यशालाएं बुक करें, और सिर्फ एक स्मारिका से अधिक घर लाएं।",
        start_journey: "अपनी यात्रा शुरू करें",
        search_placeholder: "शिल्प खोजें...",

        // Navigation
        explore: "एक्सप्लोर करें",
        map: "मैप",
        login: "लॉग इन करें",
        join_now: "अभी शामिल हों",

        // Categories
        all_crafts: "सभी शिल्प",
        sandalwood_carving: "🌿 चंदन की नक्काशी",
        silk_weaving: "🧵 रेशम बुनाई",
        mysore_painting: "🎨 मैसूर पेंटिंग",
        traditional_pottery: "🏺 पारंपरिक मिट्टी के बर्तन",
        incense_making: "🔥 अगरबत्ती बनाना",
        stone_sculpture: "🗿 पत्थर की मूर्ति",

        // Login
        welcome_back: "वापसी पर स्वागत है",
        login_subtitle: "अपनी यात्रा जारी रखने के लिए लॉगिन करें",
        identifier_label: "ईमेल या फ़ोन नंबर",
        password_label: "पासवर्ड",
        forgot_password: "पासवर्ड भूल गए?",
        login_btn: "लॉग इन करें",
        no_account: "खाता नहीं है?",
        create_account_link: "नया खाता बनाएँ",

        // Signup
        create_account_title: "खाता बनाएँ",
        full_name_label: "पूरा नाम",
        email_label: "ईमेल पता",
        phone_label: "फ़ोन नंबर",
        verify_details: "विवरण सत्यापित करें",
        google_sign_up: "गूगल के साथ साइन अप करें",
        verify_contact: "संपर्क जानकारी सत्यापित करें",
        otp_subtitle: "अपने ईमेल और फ़ोन पर भेजे गए ओटीपी दर्ज करें",
        email_otp: "ईमेल ओटीपी",
        phone_otp: "फ़ोन ओटीपी",
        verify_both: "दोनों सत्यापित करें",
        secure_account: "अपना खाता सुरक्षित करें",
        create_password: "पासवर्ड बनाएँ",
        confirm_password: "पासवर्ड की पुष्टि करें",

        // User Dashboard
        hello: "नमस्ते",
        ready_explore: "मैसूरु घूमने के लिए तैयार हैं?",
        explore_mysore: "मैसूर एक्सप्लोर करें",
        explore_desc: "छिपे हुए रत्नों और सांस्कृतिक विरासत की खोज करें।",
        trip_planning: "आपका ट्रैवल एजेंट",
        trip_desc: "अपनी संपूर्ण मैसूर यात्रा कार्यक्रम तैयार करें।",
        trips: "यात्राएं",
        trips_desc: "अपनी आगामी और पिछली यात्राओं का प्रबंधन करें।",
        google_maps: "गूगल मैप्स",
        maps_desc: "शहर में आसानी से नेविगेट करें।",
        saved_places: "सहेजे गए स्थान",
        bucket_empty: "आपकी बकेट लिस्ट खाली है। एक्सप्लोर करना शुरू करें!",
        recent_trips: "हाल की यात्राएं",
        no_recent: "कोई हालिया गतिविधि नहीं मिली।",

        // Settings
        settings_title: "सेटिंग्स",
        appearance: "दिखावट",
        light_mode: "लाइट मोड",
        dark_mode: "डार्क मोड",
        app_language: "ऐप की भाषा",
        edit_profile: "प्रोफ़ाइल संपादित करें",
        security: "सुरक्षा",
        change_password: "पासवर्ड बदलें",
        old_password: "पुराना पासवर्ड",
        new_password: "नया पासवर्ड",
        confirm_new_password: "नया पासवर्ड फिर से दर्ज करें",
        update_password: "पासवर्ड अपडेट करें",
        delete_account: "खाता हटाएं",
        delete_confirm_text: "एक बार जब आप अपना खाता हटा देते हैं, तो पीछे मुड़ने का कोई रास्ता नहीं होता है। कृपया निश्चित रहें।",
        enter_password_confirm: "पुष्टि करने के लिए पासवर्ड दर्ज करें",

        // Admin Dashboard
        admin_console: "एडमिन कंसोल",
        platform_overview: "प्लेटफ़ॉर्म अवलोकन",
        system_configuration: "सिस्टम कॉन्फ़िगरेशन",
        dashboard: "डैशबोर्ड",
        total_users: "कुल उपयोगकर्ता",
        total_partners: "कुल भागीदार",
        users_directory: "उपयोगकर्ता निर्देशिका",
        search_users: "उपयोगकर्ता खोजें...",
        name: "नाम",
        email: "ईमेल",
        phone_number: "फ़ोन नंबर",
        partners_directory: "भागीदार निर्देशिका",
        export_csv: "CSV निर्यात करें",
        establishment_name: "संस्थान का नाम",
        contact_email: "संपर्क ईमेल",
        admin_profile: "एडमिन प्रोफ़ाइल",
        admin_email: "एडमिन ईमेल",
        admin_phone: "एडमिन फ़ोन",
        save_changes: "परिवर्तन सहेजें",
        system_controls: "सिस्टम नियंत्रण",
        maintenance_mode: "रखरखाव मोड",
        maintenance_desc: "सभी गैर-प्रशासक उपयोगकर्ताओं के लिए पहुंच अक्षम करें।",
        global_broadcast: "ग्लोबल ब्रॉडकास्ट",
        broadcast_placeholder: "सभी उपयोगकर्ताओं के लिए तत्काल संदेश टाइप करें...",
        send: "भेजें",
        logout_admin: "एडमिन सत्र लॉग आउट करें",

        // Explore Page
        explore_mysuru: "मैसूरु एक्सप्लोर करें",
        choose_experience: "चुनें कि आप क्या अनुभव करना चाहते हैं",
        famous_places: "प्रसिद्ध स्थान",
        famous_places_desc: "लोकप्रिय पर्यटन स्थल",
        hidden_gems: "छिपे हुए रत्न",
        hidden_gems_desc: "अनदेखे स्थान",
        hotels: "होटल",
        hotels_desc: "आरामदायक ठहराव",
        local_food: "स्थानीय भोजन",
        local_food_desc: "प्रामाणिक मैसूर व्यंजन",
        culture: "संस्कृति",
        culture_desc: "विरासत और परंपराएं",
        artists: "कलाकार",
        artists_desc: "स्थानीय कला और शिल्प",

        // Trip Planning Page
        trip_planner: "आपका ट्रैवल एजेंट",
        who_travelling: "आप किसके साथ यात्रा कर रहे हैं?",
        how_long_stay: "आपका प्रवास कितने दिनों का है?",
        ai_curated: "AI क्यूरेटेड यात्रा कार्यक्रम",
        family: "परिवार",
        friends: "दोस्त",
        couple: "जोड़ा",
        solo: "अकेले",
        enter_duration: "अवधि दर्ज करें",
        number_of_days: "दिनों की संख्या",
        generate_plan: "योजना बनाएं",
        curating_trip: "सही {type} यात्रा तैयार की जा रही है...",
        top_recommendations: "{days} दिनों के लिए शीर्ष सिफारिशें",
        make_own_plan: "अपनी खुद की योजना बनाएं",
        customize_journey: "अपनी यात्रा के हर विवरण को अनुकूलित करें",

        // Places List Page
        touristy_must: "पर्यटकों के लिए जरूरी",
        offbeat_local: "अनोखा और स्थानीय",
        get_directions: "दिशा-निर्देश प्राप्त करें",

        // Forgot Password Page
        verify_otp: "OTP सत्यापित करें",
        reset_password: "पासवर्ड रीसेट करें",
        enter_email_phone_otp: "OTP प्राप्त करने के लिए अपना ईमेल या फ़ोन दर्ज करें",
        enter_code_sent: "{identifier} पर भेजा गया 4-अंकीय कोड दर्ज करें",
        create_new_password: "एक नया मजबूत पासवर्ड बनाएं",
        email_or_phone: "ईमेल या फ़ोन",
        send_otp: "OTP भेजें",
        enter_otp: "OTP दर्ज करें",
        verify_code: "कोड सत्यापित करें",
        resend_otp: "OTP पुनः भेजें",
        reset_password_btn: "पासवर्ड रीसेट करें"
    },
    kn: {
        // Common
        save: "ಉಳಿಸಿ",
        cancel: "ರದ್ದುಮಾಡಿ",
        loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        back: "ಹಿಂದಕ್ಕೆ",
        logout: "ಲಾಗ್ ಔಟ್",

        // Home
        hero_title: "ಮೈಸೂರಿನ ಕರಕುಶಲತೆಯನ್ನು ಅನ್ವೇಷಿಸಿ",
        hero_subtitle: "ಮಾಸ್ಟರ್ ಕಾರಿಗರರನ್ನು ಹುಡುಕಿ, ಕಾರ್ಯಾಗಾರಗಳನ್ನು ಬುಕ್ ಮಾಡಿ, ಮತ್ತು ಕೇವಲ ಸ್ಮಾರಕಕ್ಕಿಂತ ಹೆಚ್ಚು ಮನೆಗೆ ತನ್ನಿ.",
        start_journey: "ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
        search_placeholder: "ಕರಕುಶಲತೆಯನ್ನು ಹುಡುಕಿ...",

        // Navigation
        explore: "ಅನ್ವೇಷಿಸಿ",
        map: "ನಕ್ಷೆ",
        login: "ಲಾಗಿನ್",
        join_now: "ಈಗ ಸೇರಿ",

        // Categories
        all_crafts: "ಎಲ್ಲಾ ಕರಕುಶಲ",
        sandalwood_carving: "🌿 ಗಂಧದ ಕೆತ್ತನೆ",
        silk_weaving: "🧵 ರೇಷ್ಮೆ ನೇಯ್ಗೆ",
        mysore_painting: "🎨 ಮೈಸೂರ್ ಚಿತ್ರಕಲೆ",
        traditional_pottery: "🏺 ಸಾಂಪ್ರದಾಯಿಕ ಕುಂಬಾರಿಕೆ",
        incense_making: "🔥 ಧೂಪ ತಯಾರಿಕೆ",
        stone_sculpture: "🗿 ಕಲ್ಲಿನ ಶಿಲ್ಪ",

        // Login
        welcome_back: "ಮತ್ತೆ ಸುಸ್ವಾಗತ",
        login_subtitle: "ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಮುಂದುವರಿಸಲು ಲಾಗಿನ್ ಮಾಡಿ",
        identifier_label: "ಇಮೇಲ್ ಅಥವಾ ಫೋನ್ ಸಂಖ್ಯೆ",
        password_label: "ಪಾಸ್‌ವರ್ಡ್",
        forgot_password: "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರುವಿರಾ?",
        login_btn: "ಲಾಗಿನ್ ಮಾಡಿ",
        no_account: "ಖಾತೆ ಇಲ್ಲವೇ?",
        create_account_link: "ಹೊಸ ಖಾತೆ ರಚಿಸಿ",

        // Signup
        create_account_title: "ಖಾತೆ ರಚಿಸಿ",
        full_name_label: "ಪೂರ್ಣ ಹೆಸರು",
        email_label: "ಇಮೇಲ್ ವಿಳಾಸ",
        phone_label: "ಫೋನ್ ಸಂಖ್ಯೆ",
        verify_details: "ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
        google_sign_up: "ಗೂಗಲ್ ಮೂಲಕ ಸೈನ್ ಅಪ್ ಮಾಡಿ",
        verify_contact: "ಸಂಪರ್ಕ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ",
        otp_subtitle: "ನಿಮ್ಮ ಇಮೇಲ್ ಮತ್ತು ಫೋನ್‌ಗೆ ಕಳುಹಿಸಿದ OTP ಗಳನ್ನು ನಮೂದಿಸಿ",
        email_otp: "ಇಮೇಲ್ OTP",
        phone_otp: "ಫೋನ್ OTP",
        verify_both: "ಎರಡನ್ನೂ ಪರಿಶೀಲಿಸಿ",
        secure_account: "ನಿಮ್ಮ ಖಾತೆಯನ್ನು ಸುರಕ್ಷಿತಗೊಳಿಸಿ",
        create_password: "ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ",
        confirm_password: "ಪಾಸ್‌ವರ್ಡ್ ಖಚಿತಪಡಿಸಿ",

        // User Dashboard
        hello: "ನಮಸ್ಕಾರ",
        ready_explore: "ಮೈಸೂರನ್ನು ಅನ್ವೇಷಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
        explore_mysore: "ಮೈಸೂರನ್ನು ಅನ್ವೇಷಿಸಿ",
        explore_desc: "ಅಡಗಿರುವ ರತ್ನಗಳು ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ.",
        trip_planning: "ನಿಮ್ಮ ಟ್ರಾವೆಲ್ ಏಜೆಂಟ್",
        trip_desc: "ನಿಮ್ಮ ಪರಿಪೂರ್ಣ ಮೈಸೂರು ಪ್ರವಾಸದ ವಿವರವನ್ನು ರೂಪಿಸಿ.",
        trips: "ಪ್ರಯಾಣಗಳು",
        trips_desc: "ನಿಮ್ಮ ಮುಂಬರುವ ಮತ್ತು ಹಿಂದಿನ ಪ್ರಯಾಣಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
        google_maps: "ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್",
        maps_desc: "ನಗರವನ್ನು ಸುಲಭವಾಗಿ ಸಂಚರಿಸಿ.",
        saved_places: "ಉಳಿಸಿದ ಸ್ಥಳಗಳು",
        bucket_empty: "ನಿಮ್ಮ ಬಕೆಟ್ ಪಟ್ಟಿ ಖಾಲಿಯಿದೆ. ಅನ್ವೇಷಿಸಲು ಪ್ರಾರಂಭಿಸಿ!",
        recent_trips: "ಇತ್ತೀಚಿನ ಪ್ರಯಾಣಗಳು",
        no_recent: "ಯಾವುದೇ ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ ಕಂಡುಬಂದಿಲ್ಲ.",

        // Settings
        settings_title: "ಸೆಟ್ಟಿಂಗ್ಸ್",
        appearance: "ನೋಟ",
        light_mode: "ಲೈಟ್ ಮೋಡ್",
        dark_mode: "ಡಾರ್ಕ್ ಮೋಡ್",
        app_language: "ಅಪ್ಲಿಕೇಶನ್ ಭಾಷೆ",
        edit_profile: "ಪ್ರೊಫೈಲ್ ಎಡಿಟ್ ಮಾಡಿ",
        security: "ಭದ್ರತೆ",
        change_password: "ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ",
        old_password: "ಹಳೆಯ ಪಾಸ್‌ವರ್ಡ್",
        new_password: "ಹೊಸ ಪಾಸ್‌ವರ್ಡ್",
        confirm_new_password: "ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಮತ್ತೆ ನಮೂದಿಸಿ",
        update_password: "ಪಾಸ್‌ವರ್ಡ್ ನವೀಕರಿಸಿ",
        delete_account: "ಖಾತೆ ಅಳಿಸಿ",
        delete_confirm_text: "ಒಮ್ಮೆ ನೀವು ನಿಮ್ಮ ಖಾತೆಯನ್ನು ಅಳಿಸಿದರೆ, ಹಿಂತಿರುಗಲು ಸಾಧ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಖಚಿತವಾಗಿರಿ.",
        enter_password_confirm: "ಖಚಿತಪಡಿಸಲು ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ",

        // Admin Dashboard
        admin_console: "ಅಡ್ಮಿನ್ ಕನ್ಸೋಲ್",
        platform_overview: "ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅವಲೋಕನ",
        system_configuration: "ಸಿಸ್ಟಮ್ ಕಾನ್ಫಿಗರೇಶನ್",
        dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        total_users: "ಒಟ್ಟು ಬಳಕೆದಾರರು",
        total_partners: "ಒಟ್ಟು ಪಾಲುದಾರರು",
        users_directory: "ಬಳಕೆದಾರರ ವಿವರ",
        search_users: "ಬಳಕೆದಾರರನ್ನು ಹುಡುಕಿ...",
        name: "ಹೆಸರು",
        email: "ಇಮೇಲ್",
        phone_number: "ಫೋನ್ ಸಂಖ್ಯೆ",
        partners_directory: "ಪಾಲುದಾರರ ವಿವರ",
        export_csv: "CSV ರಫ್ತು ಮಾಡಿ",
        establishment_name: "ಸಂಸ್ಥೆಯ ಹೆಸರು",
        contact_email: "ಸಂಪರ್ಕ ಇಮೇಲ್",
        admin_profile: "ಅಡ್ಮಿನ್ ಪ್ರೊಫೈಲ್",
        admin_email: "ಅಡ್ಮಿನ್ ಇಮೇಲ್",
        admin_phone: "ಅಡ್ಮಿನ್ ಫೋನ್",
        save_changes: "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ",
        system_controls: "ಸಿಸ್ಟಮ್ ನಿಯಂತ್ರಣಗಳು",
        maintenance_mode: "ನಿರ್ವಹಣಾ ಮೋಡ್",
        maintenance_desc: "ಎಲ್ಲಾ ಅಡ್ಮಿನ್ ಅಲ್ಲದ ಬಳಕೆದಾರರಿಗೆ ಪ್ರವೇಶವನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ.",
        global_broadcast: "ಜಾಗತಿಕ ಪ್ರಸಾರ",
        broadcast_placeholder: "ಎಲ್ಲಾ ಬಳಕೆದಾರರಿಗೆ ತುರ್ತು ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...",
        send: "ಕಳುಹಿಸಿ",
        logout_admin: "ಅಡ್ಮಿನ್ ಸೆಶನ್ ಲಾಗ್ ಔಟ್ ಮಾಡಿ",

        // Explore Page
        explore_mysuru: "ಮೈಸೂರನ್ನು ಅನ್ವೇಷಿಸಿ",
        choose_experience: "ನೀವು ಏನನ್ನು ಅನುಭವಿಸಲು ಬಯಸುತ್ತೀರಿ ಎಂಬುದನ್ನು ಆಯ್ಕೆಮಾಡಿ",
        famous_places: "ಪ್ರಸಿದ್ಧ ಸ್ಥಳಗಳು",
        famous_places_desc: "ಜನಪ್ರಿಯ ಪ್ರವಾಸಿ ತಾಣಗಳು",
        hidden_gems: "ಅಡಗಿರುವ ರತ್ನಗಳು",
        hidden_gems_desc: "ಅನ್ವೇಷಿಸದ ತಾಣಗಳು",
        hotels: "ಹೋಟೆಲ್‌ಗಳು",
        hotels_desc: "ಆರಾಮದಾಯಕ ವಸತಿ",
        local_food: "ಸ್ಥಳೀಯ ಆಹಾರ",
        local_food_desc: "ಅಧಿಕೃತ ಮೈಸೂರು ಪಾಕವಿಧಾನಗಳು",
        culture: "ಸಂಸ್ಕೃತಿ",
        culture_desc: "ಪರಂಪರೆ ಮತ್ತು ಸಂಪ್ರದಾಯಗಳು",
        artists: "ಕಲಾವಿದರು",
        artists_desc: "ಸ್ಥಳೀಯ ಕಲೆ ಮತ್ತು ಕರಕುಶಲ",

        // Trip Planning Page
        trip_planner: "ನಿಮ್ಮ ಟ್ರಾವೆಲ್ ಏಜೆಂಟ್",
        who_travelling: "ನೀವು ಯಾರೊಂದಿಗೆ ಪ್ರಯಾಣಿಸುತ್ತಿದ್ದೀರಿ?",
        how_long_stay: "ನಿಮ್ಮ ವಾಸ್ತವ್ಯ ಎಷ್ಟು ದಿನಗಳದ್ದು?",
        ai_curated: "AI ಕ್ಯೂರೇಟೆಡ್ ಪ್ರವಾಸ ವಿವರ",
        family: "ಕುಟುಂಬ",
        friends: "ಸ್ನೇಹಿತರು",
        couple: "ದಂಪತಿಗಳು",
        solo: "ಏಕಾಂಗಿ",
        enter_duration: "ಅವಧಿಯನ್ನು ನಮೂದಿಸಿ",
        number_of_days: "ದಿನಗಳ ಸಂಖ್ಯೆ",
        generate_plan: "ಯೋಜನೆ ರಚಿಸಿ",
        curating_trip: "ಪರಿಪೂರ್ಣ {type} ಪ್ರವಾಸವನ್ನು ರಚಿಸಲಾಗುತ್ತಿದೆ...",
        top_recommendations: "{days} ದಿನಗಳಿಗೆ ಉನ್ನತ ಶಿಫಾರಸುಗಳು",
        make_own_plan: "ನಿಮ್ಮ ಸ್ವಂತ ಯೋಜನೆ ಮಾಡಿ",
        customize_journey: "ನಿಮ್ಮ ಪ್ರಯಾಣದ ಪ್ರತಿಯೊಂದು ವಿವರವನ್ನು ಕಸ್ಟಮೈಸ್ ಮಾಡಿ",

        // Places List Page
        touristy_must: "ಪ್ರವಾಸಿಗರಿಗೆ ಅವಶ್ಯ",
        offbeat_local: "ಅಸಾಮಾನ್ಯ ಮತ್ತು ಸ್ಥಳೀಯ",
        get_directions: "ದಿಕ್ಕುಗಳನ್ನು ಪಡೆಯಿರಿ",

        // Forgot Password Page
        verify_otp: "OTP ಪರಿಶೀಲಿಸಿ",
        reset_password: "ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ",
        enter_email_phone_otp: "OTP ಸ್ವೀಕರಿಸಲು ನಿಮ್ಮ ಇಮೇಲ್ ಅಥವಾ ಫೋನ್ ನಮೂದಿಸಿ",
        enter_code_sent: "{identifier} ಗೆ ಕಳುಹಿಸಿದ 4-ಅಂಕಿಯ ಕೋಡ್ ನಮೂದಿಸಿ",
        create_new_password: "ಹೊಸ ಬಲವಾದ ಪಾಸ್‌ವರ್ಡ್ ರಚಿಸಿ",
        email_or_phone: "ಇಮೇಲ್ ಅಥವಾ ಫೋನ್",
        send_otp: "OTP ಕಳುಹಿಸಿ",
        enter_otp: "OTP ನಮೂದಿಸಿ",
        verify_code: "ಕೋಡ್ ಪರಿಶೀಲಿಸಿ",
        resend_otp: "OTP ಮರುಕಳುಹಿಸಿ",
        reset_password_btn: "ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ"
    },
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('language') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
