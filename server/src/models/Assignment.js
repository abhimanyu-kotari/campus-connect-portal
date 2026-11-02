import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
      default: 'CS3301 - Full Stack'
    },
    title: {
      type: String,
      required: [true, 'Assignment title is required'],
      trim: true
    },
    dueDate: {
      type: String,
      default: 'Next Week',
      trim: true
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'Submitted', 'In Review', 'Graded'],
        message: '{VALUE} is not a valid status'
      },
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

// Virtual id string property so frontend React components work seamlessly with both item.id and item._id
assignmentSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret.__v;
    return ret;
  }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
