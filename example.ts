import { processMarkdownToHTML, processMarkdownToMarp, ProcessingPipeline } from './src/index.js';

// Example 1: Quick conversion to HTML
async function quickExample() {
  try {
    const inputDirectory = './'; // Directory containing the 5 markdown files
    const htmlOutput = await processMarkdownToHTML(inputDirectory);
    
    console.log('HTML slideshow generated successfully!');
    console.log('Length:', htmlOutput.length, 'characters');
    
    // You can save the HTML to a file here
    // fs.writeFileSync('slideshow.html', htmlOutput);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 2: Generate Marp markdown only
async function marpExample() {
  try {
    const inputDirectory = './';
    const marpOutput = await processMarkdownToMarp(inputDirectory);
    
    console.log('Marp markdown generated successfully!');
    console.log('Preview:');
    console.log(marpOutput.substring(0, 500) + '...');
    
    // You can save the Marp markdown to a file here
    // fs.writeFileSync('slides.md', marpOutput);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example 3: Advanced usage with processing pipeline
async function advancedExample() {
  const pipeline = new ProcessingPipeline();
  
  try {
    const inputDirectory = './';
    
    console.log('Starting processing pipeline...');
    
    // Process files and get HTML slideshow
    const htmlSlideshow = await pipeline.processFiles(inputDirectory);
    
    console.log('Processing completed!');
    
    // Get processing status
    const status = pipeline.getProcessingStatus();
    console.log('Final status:', status);
    
    // Generate processing report
    const report = pipeline.generateProcessingReport();
    console.log('Processing report:');
    console.log('- Total slides:', report.summary.totalSlides);
    console.log('- Estimated time:', report.summary.totalTime, 'minutes');
    console.log('- Quality score:', report.summary.qualityScore, '/100');
    console.log('- Errors:', report.issues.errors.length);
    console.log('- Warnings:', report.issues.warnings.length);
    
    if (report.recommendations.length > 0) {
      console.log('Recommendations:');
      report.recommendations.forEach((rec, index) => {
        console.log(`  ${index + 1}. ${rec}`);
      });
    }
    
    // Generate complete HTML file
    const completeHTML = pipeline.generateCompleteHTML();
    console.log('Complete HTML generated, length:', completeHTML.length, 'characters');
    
    // Generate Marp markdown
    const marpMarkdown = pipeline.generateMarpMarkdown();
    console.log('Marp markdown generated, length:', marpMarkdown.length, 'characters');
    
  } catch (error) {
    console.error('Processing failed:', error);
    
    // Even if processing fails, you can still get the status
    const status = pipeline.getProcessingStatus();
    console.log('Error occurred at stage:', status.currentStage);
    console.log('Progress:', status.progress, '%');
    console.log('Errors:', status.errors);
  }
}

// Example 4: Monitor processing progress
async function monitoringExample() {
  const pipeline = new ProcessingPipeline();
  
  try {
    const inputDirectory = './';
    
    // Start processing in the background
    const processingPromise = pipeline.processFiles(inputDirectory);
    
    // Monitor progress
    const progressInterval = setInterval(() => {
      const status = pipeline.getProcessingStatus();
      console.log(`Progress: ${status.progress}% - Stage: ${status.currentStage} - ETA: ${status.estimatedTimeRemaining}s`);
      
      if (status.progress >= 100) {
        clearInterval(progressInterval);
      }
    }, 1000);
    
    // Wait for completion
    const result = await processingPromise;
    clearInterval(progressInterval);
    
    console.log('Processing completed successfully!');
    console.log('Generated', result.slides.length, 'slides');
    
  } catch (error) {
    console.error('Processing failed:', error);
  }
}

// Run examples
console.log('Running Marp2Slide examples...\n');

// Uncomment the example you want to run:
// quickExample();
// marpExample();
// advancedExample();
// monitoringExample();

export {
  quickExample,
  marpExample,
  advancedExample,
  monitoringExample
};