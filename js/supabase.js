(function () {
  const supabaseUrl = 'https://rmcxoxlfmrtvsytcqxcw.supabase.co';
  const supabaseAnonKey = 'sb_publishable_CCjEPwlHMVHengR1DnRw4g_XL6icVEQ';

  if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
    window.ESO_AUTO_SUPABASE = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
    window.supabase = window.ESO_AUTO_SUPABASE;
  } else {
    window.ESO_AUTO_SUPABASE = null;
  }
})();